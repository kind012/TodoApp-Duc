"use client";
import { ITodos } from "@/models";
import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Modal from "../components/Modal";

interface Data {
  todo: ITodos[];
}

const Task = () => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLInputElement>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [todos, setTodos] = useState<ITodos[]>([]);
  console.log(todos);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/posts?id=${currentId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = useCallback(async () => {
    const editTodo = {
      name: nameRef.current?.value,
      priority: priorityRef.current?.value,
    };
    if (!editTodo.name || !editTodo.priority) {
      alert("Name and priority are required");
      return;
    }
    if (!currentId) {
      alert("Please select a task to update");
      return;
    }

    try {
      const { data } = await axios.put<Data>(
        `/api/posts?id=${currentId}`,
        editTodo
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }, [currentId]);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const res = await axios.get<Data>("/api/posts");
        setTodos(res.data.todo);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTodos();
  }, []);
  return (
    <>
      {todos?.map((todo) => {
        return (
          <tr key={todo._id} onClick={() => setCurrentId(todo._id)}>
            <td className="w-full">{todo.name}</td>
            <td className="w-full">{todo.priority}</td>
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
                  <button onClick={handleDelete} className="btn">
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

// function và đoạn code của tôi có vấn đề gì không

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const editTodo = { name: newName, priority: newPriority };
//     if (!newName || !newPriority) {
//       alert("Name and priority are required");
//       return;
//     }
//     if (!currentId) {
//       alert("Please select a task to update");
//       return;
//     }

//     try {
//       const res = await axios.put<Data>(`/api/posts&id=${currentId}`, editTodo);
//       setTodos(res.data.todo);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//     <tr key={todo._id} onClick={() => setCurrentId(todo._id)}>
//             <td className="w-full">{todo.name}</td>
//             <td className="w-full">{todo.priority}</td>
//             <td className="flex gap-5">
//               <FiEdit
//                 cursor="pointer"
//                 onClick={() => setOpenModalEdit(true)}
//                 className="text-blue-500"
//                 size={25}
//               />
//               <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
//                 <form onSubmit={handleSubmit}>
//                   <h3 className="text-lg font-bold">Edit task</h3>
//                   <div className="modal-action">
//                     <input
//                       value={newName}
//                       onChange={(e) => setNewName(e.target.value)}
//                       type="text"
//                       placeholder="Type here"
//                       className="w-full input input-bordered"
//                     />
//                     <input
//                       value={newPriority}
//                       onChange={(e) => setNewPriority(e.target.value)}
//                       type="text"
//                       placeholder="Type here"
//                       className="w-full input input-bordered"
//                     />
//                     <button type="submit" className="btn">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </Modal>
