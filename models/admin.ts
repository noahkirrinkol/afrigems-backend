import mongoose, { Schema, Document } from "mongoose";

export interface Admin extends Document {
  email: string;
  password: string;
}

const adminSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Admin>("Admin", adminSchema);
