import { Redis } from "ioredis";
import Joi from 'joi'

declare module 'Koa' {
  interface Context extends DefaultContext {
    redis: Redis,
  }
}