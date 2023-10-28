"use client";
import { ITodos } from "@/models";
import axios from "axios";
import React, { useState, useCallback, useRef, FormEvent } from "react";
import useSWR from "swr";
import ModalFormDelete from "@/components/ModalFormDelete";
import { FiEdit } from "react-icons/fi";
import Modal from "@/components/Modal";
import { toast } from "sonner";

const Task = () => {
  const [currentId, setCurrentId] = useState<string>("");
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const fetcher = (url: string) => axios.get(url).then((res) => res?.data);
  const { data, mutate } = useSWR("/api/posts", fetcher, {
    revalidateOnMount: true,
  });

  const handleDelete = async () => {
    try {
      await axios.delete<ITodos[]>(`/api/posts?id=${currentId}`);
      mutate(false);
      setOpenModalDeleted(false);
      toast.success("Delete task successfully");
    } catch (error) {
      toast.error("Failed to delete task, please try again.");
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editTodo = {
      name: name,
      priority: priority,
    };

    try {
      const res = await axios.put<ITodos[]>(
        `/api/posts?id=${currentId}`,
        editTodo
      );
      mutate(res.data);
      toast.success("Update task successfully");
    } catch (error) {
      toast.error("Failed to update task, please try again.");
      console.log(error);
    }
    setName("");
    setPriority("");
  };

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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Name"
                      required
                      className="w-full input input-bordered"
                    />
                    <input
                      name={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      type="text"
                      placeholder="Priority"
                      required
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
