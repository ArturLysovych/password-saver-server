import * as mongoose from 'mongoose';

export const PasswordSchema = new mongoose.Schema({
    userId: String,
    userLogin: String,
    service: String,
    password: String,
});

export interface Password extends mongoose.Document {
  userId: string,
  userLogin: string,
  service: string,
  password: string,
}
