import { redisGet, redisSet } from "@db/common/redis";
import { Context } from "koa";

export const helloWorld = async (ctx: Context) => {

  return ctx.body = 'Hello get'
}