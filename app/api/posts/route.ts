import { connectMongoDB } from "@/libs/ultils";
import { Todo } from "@/models";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json({ message: "Todo Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const id = req?.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    await connectMongoDB();
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (deletedTodo) {
      return NextResponse.json(deletedTodo);
    }
    return NextResponse.json({ message: "Todo Not Found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Deletion error" }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const id = req?.nextUrl.searchParams.get("id");
    const { name, priority } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Id is required" }, { status: 400 });
    }
    await connectMongoDB();

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { name: name ?? undefined, priority: priority ?? undefined },
      { new: true }
    );
    if (!updatedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}
