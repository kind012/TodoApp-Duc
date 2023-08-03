import { connectMongoDB } from "@/libs/ultils";
import { ITodos, Todo } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
const app = express();
app.use(express.json());

export async function GET() {
  await connectMongoDB();
  const todo = await Todo.find();
  return NextResponse.json({ todo }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { name, priority } = await req.json();
    await connectMongoDB();
    await Todo.create({ name, priority });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    await connectMongoDB();
    const deletedTodo = await Todo.findByIdAndDelete({ _id: id });
    if (deletedTodo) {
      return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
    }
    return NextResponse.json({ message: "Topic Not Found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Deletion error" }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const { name, priority } = req.body as unknown as ITodos;
  if (!id) {
    return NextResponse.json({ message: "Id is required" }, { status: 400 });
  }
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { name, priority },
      { new: true }
    );
    if (!updatedTodo) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Topic Update" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}
