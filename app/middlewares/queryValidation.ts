import { Context, Next } from "koa";
import Joi from 'joi'
import { Response } from "@utils/response";

export const queryValidation = async (ctx: Context, next: Next, validation?: Joi.Schema) => {
  const { query, body } = ctx.request;
  const queryInRequest = Object.assign({}, query) as Record<string, any>;
  const bodyInRequest = body as Record<string, any>;

  const needValidation = ctx.method.toLocaleLowerCase() === 'get' ? queryInRequest : bodyInRequest;

  if (validation) {
    const { value, warning, error } = validation.validate(needValidation);
    if (error) {
      return ctx.body = new Response(400, error.message, null)
    } else {
      await next();
    }
  } else {
    await next();
  }
};
