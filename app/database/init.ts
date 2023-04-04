import mongoose, { Mongoose } from 'mongoose';
import redis from 'ioredis';

export const initMoongoDB = async () => {
  const uri = process.env?.MONGO_URI;
  if (uri) {
    try {
      mongoose.connect(uri).then(() => {
        console.log('mongo connected')
      })
    } catch (error) {
      console.log(error)
      process.exit(-1)
    }
  } else {
    throw 'auth error, please check your .env file'
  }
}

export const initRedis = async () => {
  const uri = process.env?.REDIS_URI;

  if (uri) {
    const instance = new redis(uri);

    instance.connect(() => {
      console.log('redis connected')
    });

    instance.monitor().then(function (monitor) {
      monitor.on('monitor', function (time, args, source, database) {
        console.log(`${time} : ${source} ${args} ${database}`);
      });
    });
    return instance;
  }

  return;

}