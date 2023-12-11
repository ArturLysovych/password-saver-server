import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  login: String,
  password: String,
});

export interface User extends mongoose.Document {
  login: string,
  password: string,
}
