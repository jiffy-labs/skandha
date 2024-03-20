import Redis from "ioredis";
import { getUserOperationHashV6, convertU8ArrayUserOpToStringUserOp } from "./utils";
import { ts } from "types/lib";
import logger from "api/lib/logger";


export type JiffyscanParams = {
  redisUrl: string;
  redisPort: string;
}

export class Jiffyscan {
  // redisClient: Redis;

  constructor({ redisUrl, redisPort }: JiffyscanParams) {
    console.log("redisUrl", redisUrl)
    console.log("redisPort", redisPort)
    // this.redisClient = new Redis(`rediss://${redisUrl}:${redisPort}`);
  }

  async publish(userOp: ts.VerifiedUserOperation, mempoolId: string, seenTimestampSec: number) {
    const { user_operation, entry_point, verified_at_block_hash } = userOp;
    console.log("mempoolId", mempoolId);
    logger.info({ mempoolId }, "Received gossip block");
    const stringifiedUserOp = convertU8ArrayUserOpToStringUserOp(user_operation);

    logger.info({ getUserOperationHashV6: getUserOperationHashV6(stringifiedUserOp, mempoolId), www: "wut" }, "getUserOperationHashV6");

    //   if (userOp)
    //     await this.redisClient.set(getUserOperationHashV6(user_operation, mempoolId, entry_point), JSON.stringify({
    //       user_operation: user_operation,
    //       entryPoint: ENTRY_POINT_V6,
    //       mempoolId: mempoolId,
    //       network: MEMPOOL_ID_TO_CHAIN_ID[mempoolId],
    //       verified_at_block_hash: verified_at_block_hash,
    //       seenTimestampSec: seenTimestampSec
    //     }))
  }
}

