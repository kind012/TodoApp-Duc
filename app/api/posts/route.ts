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
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
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
  await connectMongoDB();
  await Todo.findByIdAndUpdate(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}

// async function GET của tôi có viết đúng logic và có sai sót gì không, có bạn fix giúp tôi với

// export async function GET() {
//   await connectMongoDB();
//   const todo = await Todo.find();
//   return NextResponse.json({ todo });
// }
