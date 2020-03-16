import { prop, getModelForClass } from "@typegoose/typegoose";
import { withMongoose } from "./Mongoose";

class User {
  @prop({ required: true })
  public username!: string;

  @prop()
  public passwordHash?: string;
}

const UserModel = getModelForClass(User);

type _ID = { _id: string };

type R<T> = Readonly<T> & _ID;

export namespace UserRepo {
  export const findById = (id: string): Promise<R<User> | null> =>
    withMongoose(() => UserModel.findById(id).exec());

  export const findByUsername = (username: string): Promise<R<User> | null> =>
    withMongoose(() => UserModel.findOne({ username }).exec());
}
