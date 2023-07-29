import mongoose, { Document, model } from "mongoose";

export interface ITodos extends Document {
  id: string;
  name: string;
  priority: string;
}

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    priority: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.models.Todo || mongoose.model("todos", todoSchema);
