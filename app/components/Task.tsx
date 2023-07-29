"use client";
import { ITodos } from "@/models";
import axios from "axios";
import React,{useState, useEffect, useCallback,FormEvent} from "react";
import {FiTrash2, FiEdit} from "react-icons/fi"
import Modal from "./Modal";

interface Data {
    todos: ITodos[];
}

const Task = () => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>("");
    const [newPriority, setNewPriority] = useState<string>("");
    const [currentId, setCurrentId] = useState<string| null>(null);
    const [todos, setTodos] = useState<string>("");
    
    async function getAllTodos = useCallback(() => {

    }, [])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

const editTodo = {newName, newPriority}

        try {
            const res = axios.put<Data>(`/api/posts$id=${currentId}`, editTodo)
            setTodos(res.data.todos)

        } catch (error) {
            
        }
    }
    

    useEffect(() => {
getAllTodos()
    }, [getAllTodos])
    useEffect(() => {
            if(currentId) {
          setOpenModalEdit(true)
                
            }
    }, [currentId])

  return <>
   <tr key={todo._id}>
      <td className='w-full'>{todo.name}</td>
      <td className='w-full'>{todo.priority}</td>
      <td className='flex gap-5'>
        <div onClick={() => setCurrentId(todo._id)}>
        <FiEdit
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        </div>
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmit}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action'>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <input
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <button type='submit' className='btn'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => {}} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  </>
  ;
};

export default Task;
