import { redisClient } from "index";

enum DB {
  COMMON,
  USER,
  EVENT
}

let currentDB = DB.COMMON;

export const redisGet = async (key: string, options = { db: DB.COMMON }) => {
  if (!redisClient) {
    return null;
  }
  if (options.db !== currentDB) {
    await redisClient?.select(options.db);
    currentDB = options.db;
  }
  return redisClient?.get(key);
}

export const redisSet = async (
  key: string,
  value: string,
  options: { db: DB, seconds?: number } = { db: DB.COMMON, seconds: 60 * 60 * 24 }
) => {
  if (!redisClient) {
    return null;
  }

  if (options.db !== currentDB) {
    await redisClient?.select(options.db);
    currentDB = options.db;
  }
  return redisClient.set(key, value)
}

export const redisDel = async (key: string, options = { db: DB.COMMON }) => {
  if (!redisClient) {
    return null;
  }
  if (options.db !== currentDB) {
    await redisClient?.select(options.db);
    currentDB = options.db;
  }
  return redisClient?.del(key);
}