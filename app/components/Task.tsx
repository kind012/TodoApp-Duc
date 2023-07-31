"use client";
import { ITodos } from "@/models";
import axios from "axios";
import React, { useState, useEffect, useCallback, FormEvent } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Modal from "./Modal";

interface Data {
  todo: ITodos[];
}

const Task = () => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [newPriority, setNewPriority] = useState<string>("");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [todos, setTodos] = useState<ITodos[]>([]);

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.delete(`/api/posts&id=${currentId}`);
      if (res.status === 200) {
        // Hiển thị một thông báo thành công
        alert("Task deleted successfully!");
        // Cập nhật lại danh sách các task hiện có
        setTodos(res.data);
      } else {
        // Hiển thị một thông báo lỗi
        alert("Something went wrong!");
      }
    } catch (error) {}
  };

  const getAllTodos = useCallback(async () => {
    try {
      const res = await axios.get<Data>("/api/posts");
      setTodos(res.data.todo);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editTodo = { newName, newPriority };

    try {
      const res = axios.put<Data>(`/api/posts&id=${currentId}`, editTodo);
      // setTodos(res.data.todos);
    } catch (error) {}
  };

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);
  useEffect(() => {
    if (currentId) {
      setOpenModalEdit(true);
    }
  }, [currentId]);

  return (
    <>
      {todos?.map((todo) => {
        return (
          <tr key={todo._id}>
            <td className="w-full">{todo.name}</td>
            <td className="w-full">{todo.priority}</td>
            <td className="flex gap-5">
              <div onClick={() => setCurrentId(todo._id)}>
                <FiEdit cursor="pointer" className="text-blue-500" size={25} />
              </div>
              <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form onSubmit={handleSubmit}>
                  <h3 className="text-lg font-bold">Edit task</h3>
                  <div className="modal-action">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="w-full input input-bordered"
                    />
                    <input
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="w-full input input-bordered"
                    />
                    <button type="submit" className="btn">
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
                  <button onClick={() => {}} className="btn">
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
// Tôi có 1 Todo App , tôi code bằng NextJS và Typescript và Mongodb atlas , bạn có thể tạo async function getAllTodos có sử dụng useCallback để lấy dữ liệu hiển thị lên UI mà có sử dụng axios.post('/api/posts')   không

// tôi muốn handle việc thêm 1 task , tôi muốn sử dụng axios.post("/api/posts") để đẩy dữ liệu lên mongodb atlas , tôi có 1 function handleSubmit tôi phải handle gì ở bên trong nó

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   };
