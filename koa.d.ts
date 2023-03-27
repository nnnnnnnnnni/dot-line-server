import { Redis } from "ioredis";

declare module 'Koa' {
  interface Context extends DefaultContext {
    user?: IUser | null;
    redis: Redis
    body: IResponse | fs.ReadStream;
    session: session
  }
}