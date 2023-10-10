"use client";
import { ITodos } from "@/models";
import axios from "axios";
import React, { useState, useCallback, useRef, FormEvent } from "react";
import useSWR from "swr";
import ModalFormEdit from "@/components/ModalFromEdit";
import ModalFormDelete from "@/components/ModalFormDelete";

interface Data {
  todo: ITodos[];
}

const Task = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLInputElement>(null);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, mutate } = useSWR("/api/posts", fetcher, {
    revalidateOnFocus: false,
  });

  const handleDelete = async () => {
    try {
      await axios.delete<Data>(`/api/posts?id=${currentId}`);
      mutate(false);
      setOpenModalDeleted(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const editTodo = {
        name: nameRef.current?.value,
        priority: priorityRef.current?.value,
      };

      try {
        const res = await axios.put(`/api/posts?id=${currentId}`, editTodo);
        mutate(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    [currentId, nameRef, priorityRef]
  );

  return (
    <>
      {data?.todo?.map((todo: ITodos) => {
        return (
          <tr key={todo._id} onClick={() => setCurrentId(todo._id)}>
            <td className="w-full">{todo?.name}</td>
            <td className="w-full">{todo?.priority}</td>
            <td className="flex gap-5">
              <ModalFormEdit
                handleSubmit={handleSubmit}
                nameRef={nameRef}
                priorityRef={priorityRef}
              />
              <ModalFormDelete
                handleDelete={handleDelete}
                setOpenModalDeleted={setOpenModalDeleted}
                openModalDeleted={openModalDeleted}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Task;
