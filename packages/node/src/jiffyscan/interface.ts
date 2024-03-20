import { BigNumberish, BytesLike } from "ethers";

export class SendUserOperationGasArgs {
  userOp!: SendUserOperationStruct;
  entryPoint!: string;
}

export class SendUserOperationStruct {
  sender!: string;
  nonce!: BigNumberish;
  initCode!: BytesLike;
  callData!: BytesLike;
  verificationGasLimit!: BigNumberish;
  preVerificationGas!: BigNumberish;
  maxFeePerGas!: BigNumberish;
  maxPriorityFeePerGas!: BigNumberish;
  paymasterAndData!: BytesLike;
  signature!: BytesLike;
  callGasLimit!: BigNumberish;
}
