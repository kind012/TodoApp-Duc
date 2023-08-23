import Todolist from "../components/Todolist";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="flex flex-col gap-4 my-5 text-center">
        <h1 className="text-2xl font-bold">Todo List App</h1>
      </div>

      <Todolist />
    </main>
  );
}
