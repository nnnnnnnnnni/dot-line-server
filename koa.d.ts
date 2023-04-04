import { Redis } from "ioredis";

declare module 'Koa' {
  interface Context extends DefaultContext {
    redis: Redis
  }
}