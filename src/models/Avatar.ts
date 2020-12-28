import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface AvatarProps extends mongoose.Document {
  originalname: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const AvatarSchema = new Schema<AvatarProps>({
  originalname: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  create_date: {
    type: Date,
    default: Date.now
  }
});