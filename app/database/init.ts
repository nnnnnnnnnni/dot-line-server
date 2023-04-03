import mongoose, { Mongoose } from 'mongoose';
import redis from 'ioredis';

export const initMoongoDB = async () => {
  const uri = process.env?.MONGO_URI;
  if (uri) {
    const connection = await mongoose.createConnection(uri)
    connection.once('error', (err) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      process.exit();
    });
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
    connection.on("disconnected", () => {
      console.log("MongoDB database connection disconnected");
    });
  } else {
    throw 'auth error, please check your .env file'
  }
}

export const initRedis = async () => {
  const username = process.env?.REDIS_USERNAME;
  const password = process.env?.REDIS_PASSWORD;
  const host = process.env?.REDIS_HOST;
  const instance = new redis({
    username: username,
    password: password,
    host: host,
    db: 0,
  });

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