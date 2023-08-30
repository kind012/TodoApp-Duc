"use client";
import { ITodos } from "@/models";
import axios from "axios";
import React, { useState, useCallback, useRef, FormEvent } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Modal from "../components/Modal";
import useSWR from "swr";
import Preloader from "@/components/Preload";

interface Data {
  todo: ITodos[];
}

const Task = () => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLInputElement>(null);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { error, data, mutate } = useSWR("/api/posts", fetcher);

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

  if (error)
    return (
      <tr>
        <td>
          {" "}
          <Preloader />
        </td>
      </tr>
    );

  return (
    <>
      {data?.todo?.map((todo: ITodos) => {
        return (
          <tr key={todo._id} onClick={() => setCurrentId(todo._id)}>
            <td className="w-full">{todo?.name}</td>
            <td className="w-full">{todo?.priority}</td>
            <td className="flex gap-5">
              <FiEdit
                cursor="pointer"
                onClick={() => setOpenModalEdit(true)}
                className="text-blue-500"
                size={25}
              />
              <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form onSubmit={handleSubmit}>
                  <h3 className="text-lg font-bold">Edit task</h3>
                  <div className="modal-action">
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder="Type here"
                      className="w-full input input-bordered"
                    />
                    <input
                      ref={priorityRef}
                      type="text"
                      placeholder="Type here"
                      className="w-full input input-bordered"
                    />
                    <button
                      type="submit"
                      className="btn"
                      onClick={() => setOpenModalEdit(false)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Modal>
              <FiTrash2
                onClick={() => setOpenModalDeleted(true)}
                cursor="pointer"
                className="text-red-500"
                size={25}
              />
              <Modal
                modalOpen={openModalDeleted}
                setModalOpen={setOpenModalDeleted}
              >
                <h3 className="text-lg">
                  Are you sure, you want to delete this task?
                </h3>
                <div className="modal-action">
                  <button onClick={() => handleDelete()} className="btn">
                    Yes
                  </button>
                </div>
              </Modal>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Task;
