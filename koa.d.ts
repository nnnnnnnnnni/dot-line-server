import { Redis } from "ioredis";
import { UserInterface } from './app/database/interfaces';
import { DefaultContext } from 'koa'

declare module 'koa' {
  interface Context extends DefaultContext {
    redis: Redis,
    user?: UserInterface
  }
}