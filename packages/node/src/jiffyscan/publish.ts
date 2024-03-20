import Redis from "ioredis";
import { SendUserOperationGasArgs } from "./interface"
import { BigNumberish, BytesLike } from "../../../../node_modules/ethers";
import { keccak256 } from "ethers/lib/utils";
import { RedisClient } from "ioredis/built/connectors/SentinelConnector/types";
import { ENTRY_POINT_V6, MEMPOOL_ID_TO_CHAIN_ID } from "./constants";
import { getUserOperationHashV6 } from "./utils";


export type JiffyscanParams = {
  redisUrl: string;
  redisPort: string;
}

export class Jiffysan {
  // redisClient: Redis;

  constructor({ redisUrl, redisPort }: JiffyscanParams) {
    console.log("redisUrl", redisUrl)
    console.log("redisPort", redisPort)
    // this.redisClient = new Redis(`rediss://${redisUrl}:${redisPort}`);
  }

  async publish(userOperationArgs: SendUserOperationGasArgs, mempoolId: string) {
    const { userOp, entryPoint } = userOperationArgs;
    console.log("mempoolId", mempoolId);
    // if (userOp)
    // await this.redisClient.set(getUserOperationHashV6(userOp, mempoolId, entryPoint), JSON.stringify({
    //   userOp: userOp,
    //   entryPoint: ENTRY_POINT_V6,
    //   mempoolId: mempoolId,
    //   network: MEMPOOL_ID_TO_CHAIN_ID[mempoolId]
    // }))
  }
}

