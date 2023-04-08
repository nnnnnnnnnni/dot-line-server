import { redisGet, redisSet } from "@db/common/redis";
import { Context } from "koa";

export const login = async (ctx: Context) => {
  // const vl = await redisSet('test', 'name', { db: 1 });

  return ctx.body = 'Hello get'
}