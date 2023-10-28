"use client";
import React, { FormEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@/components/Modal";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { ITodos } from "@/models";
import { toast } from "sonner";

interface Data {
  todo: ITodos[];
}

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { mutate } = useSWR("/api/posts", fetcher);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataTodo = {
      name: name,
      priority: priority,
    };

    try {
      const res = await axios.post<Data>("/api/posts", dataTodo);
      mutate(res?.data.todo);
      toast.success("Task created successfully");
    } catch (error) {
      toast.error("Failed to created task, please try again.");
      console.log(error);
    }
    setName("");
    setPriority("");
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full  btn btn-primary"
      >
        Add new task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold">Add new task</h3>
          <div className="modal-action">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full input input-bordered"
              required
            />
            <input
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              type="text"
              placeholder="Priority"
              className="w-full input input-bordered"
              required
            />
            <button
              type="submit"
              className="btn"
              onClick={() => setModalOpen(false)}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
