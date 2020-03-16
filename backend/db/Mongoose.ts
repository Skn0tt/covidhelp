import * as mongoose from "mongoose";
import { Config } from "../Config";

let alreadyConnected = false;

async function connect() {
  await mongoose.connect(Config.MONGODB_URI, { useNewUrlParser: true });
}

export async function withMongoose<T>(cb: () => T | PromiseLike<T>) {
  if (!alreadyConnected) {
    await connect();
  }

  return await cb();
}
