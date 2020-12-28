import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AvatarProps, AvatarSchema } from './Avatar';

let mongooseHidden = require('mongoose-hidden')();

const Schema = mongoose.Schema;
const saltRounds = 10;

export interface UserProps extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: AvatarProps;
}

export const UserSchema = new Schema<UserProps>({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    hide: true,
  },
  avatar: AvatarSchema,
  create_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(mongooseHidden, { hidden: { _id: false } });

UserSchema.pre<UserProps>('save',async function (next) {
  
  const newPassword = await bcrypt.hash(this.password, saltRounds);

  this.password = newPassword;

  next();
});