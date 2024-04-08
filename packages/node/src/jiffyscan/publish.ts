import Redis from "ioredis";
import {
  getUserOperationHashV6,
  convertU8ArrayUserOpToStringUserOp,
} from "./utils";
import { ts } from "types/lib";
import logger from "api/lib/logger";
import { ENTRY_POINT_V6, MEMPOOL_ID_TO_CHAIN_ID } from "./constants";

export type JiffyscanParams = {
  redisUrl: string;
  redisPort: string;
};

export class Jiffyscan {
  redisClient: Redis;

  constructor({ redisUrl, redisPort }: JiffyscanParams) {
    console.log("redisUrl", redisUrl);
    console.log("redisPort", redisPort);
    this.redisClient = new Redis(`rediss://${redisUrl}:${redisPort}`);
  }

  async publish(
    userOp: ts.VerifiedUserOperation,
    mempoolId: string,
    seenTimestampSec: number
  ) {
    const { user_operation, entry_point, verified_at_block_hash } = userOp;
    console.log("mempoolId", mempoolId);
    logger.info({ mempoolId }, "Received gossip block");
    const stringifiedUserOp =
      convertU8ArrayUserOpToStringUserOp(user_operation);
    const userOpHash = getUserOperationHashV6(stringifiedUserOp, mempoolId);
    logger.info(
      {
        getUserOperationHashV6: getUserOperationHashV6(
          stringifiedUserOp,
          mempoolId
        ),
        www: "wut",
      },
      "getUserOperationHashV6"
    );

    if (userOp) {
      console.log("time now", Date.now());
      try {
        await this.redisClient.set(
          userOpHash,
          JSON.stringify(
            {
              user_operation: stringifiedUserOp,
              entryPoint: ENTRY_POINT_V6,
              mempoolId: mempoolId,
              network: MEMPOOL_ID_TO_CHAIN_ID[mempoolId],
              verified_at_block_hash: verified_at_block_hash,
              seenTimestampSec: seenTimestampSec,
            },
            (_, v) => (typeof v === "bigint" ? v.toString() : v)
          )
        );
      } catch (err) {
        console.log(err);
      }
      console.log("after redis set", Date.now());
      console.log(await this.redisClient.get(userOpHash));
      console.log("after getting userop hash", userOpHash, Date.now());
    }
  }
}
