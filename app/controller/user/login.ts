import { Context } from "koa";

export const login = async (ctx: Context) => {
  const rpo = new Promise((res, rej) => {
    setTimeout(() => {
      rej(10)
    }, 1000)
  })

  await rpo

  return ctx.body = 'Hello get';
}