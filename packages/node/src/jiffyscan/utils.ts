import { SendUserOperationStruct } from "./interface";
import { ENTRY_POINT_V6, MEMPOOL_ID_TO_CHAIN_ID } from "./constants";
import { AbiCoder } from "@ethersproject/abi";
import { keccak256 } from "ethers/lib/utils";

const abiCoder = new AbiCoder();
export const getUserOperationHashV6 = (
    userOperation: SendUserOperationStruct,
    mempoolId: string,
    entryPoint: string
) => {
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
                userOperation.nonce.toString(),
                keccak256(userOperation.initCode.toString()),
                keccak256(userOperation.callData.toString()),
                userOperation.callGasLimit.toString(),
                userOperation.verificationGasLimit.toString(),
                userOperation.preVerificationGas.toString(),
                userOperation.maxFeePerGas.toString(),
                userOperation.maxPriorityFeePerGas.toString(),
                keccak256(userOperation.paymasterAndData.toString())
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

