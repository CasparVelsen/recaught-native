import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    password: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('User', schema);
