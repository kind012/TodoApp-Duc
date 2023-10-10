"use client";

import { useEffect, useState } from "react";
import Todolist from "@/layouts/Todolist";
import Preloader from "@/components/Preload";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  });

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="flex flex-col gap-4 my-5 text-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </div>

      {isLoading ? <Preloader /> : <Todolist />}
    </main>
  );
}
