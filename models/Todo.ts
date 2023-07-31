import mongoose, { Document } from "mongoose";

export interface ITodos extends Document {
  id: string;
  name: string;
  priority: string;
}

const todosSchema = new mongoose.Schema(
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

export const Todo =
  mongoose.models.todoapps || mongoose.model("todoapps", todosSchema);
