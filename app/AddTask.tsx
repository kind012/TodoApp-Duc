"use client";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../components/Modal";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: name,
      priority: priority,
    };

    try {
      await axios.post("/api/posts", data);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
    setName("");
    setPriority("");
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full btn btn-primary"
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
              placeholder="Type here"
              className="w-full input input-bordered"
            />
            <input
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              type="text"
              placeholder="Type here"
              className="w-full input input-bordered"
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
