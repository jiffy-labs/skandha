import { ENTRY_POINT_V6, MEMPOOL_ID_TO_CHAIN_ID } from "./constants";
import { AbiCoder } from "@ethersproject/abi";
import { keccak256 } from "ethers/lib/utils";
import { ts } from "types/lib";

const abiCoder = new AbiCoder();
export const getUserOperationHashV6 = (
    userOperation: UserOperation,
    mempoolId: string
) => {
    console.log('userOperation - ', userOperation)
    Buffer.from(userOperation.paymaster_and_data).toString('hex')
    const hash = keccak256(
        abiCoder.encode(
            [

                "address",
                "uint256",
                "bytes32",
                "bytes32",
                "uint256",
                "uint256",
                "uint256",
                "uint256",
                "uint256",
                "bytes32"
            ],
            [
                userOperation.sender,
                userOperation.nonce,
                keccak256(userOperation.init_code),
                keccak256(userOperation.call_data),
                userOperation.call_gas_limit,
                userOperation.verification_gas_limit,
                userOperation.pre_verification_gas,
                userOperation.max_fee_per_gas,
                userOperation.max_priority_fee_per_gas,
                keccak256(userOperation.paymaster_and_data)
            ]
        )
    )

    console.log('trying to find hash -', userOperation.nonce.toString());
    console.log('mempool ID for the same - ', MEMPOOL_ID_TO_CHAIN_ID[mempoolId])

    return keccak256(
        abiCoder.encode(
            [
                "bytes32",
                "address",
                "uint256"
            ],
            [hash, ENTRY_POINT_V6, BigInt(MEMPOOL_ID_TO_CHAIN_ID[mempoolId])]
        )
    )
}

export type UserOperation = {
    sender: string;
    nonce: string;
    init_code: string;
    call_data: string;
    call_gas_limit: string;
    verification_gas_limit: string;
    pre_verification_gas: string;
    max_fee_per_gas: string;
    max_priority_fee_per_gas: string;
    paymaster_and_data: string;
    signature: string;
}

export const convertU8ArrayUserOpToStringUserOp = (userOperation: ts.VerifiedUserOperation["user_operation"]): UserOperation => {
    return {
        sender: '0x' + Buffer.from(userOperation.sender).toString('hex'),
        nonce: userOperation.nonce.toString(),
        init_code: '0x' + Buffer.from(userOperation.init_code).toString('hex'),
        call_data: '0x' + Buffer.from(userOperation.call_data).toString('hex'),
        call_gas_limit: userOperation.call_gas_limit.toString(),
        verification_gas_limit: userOperation.verification_gas_limit.toString(),
        pre_verification_gas: userOperation.pre_verification_gas.toString(),
        max_fee_per_gas: userOperation.max_fee_per_gas.toString(),
        max_priority_fee_per_gas: userOperation.max_priority_fee_per_gas.toString(),
        paymaster_and_data: '0x' + Buffer.from(userOperation.paymaster_and_data).toString('hex'),
        signature: '0x' + Buffer.from(userOperation.signature).toString('hex')
    }
}
