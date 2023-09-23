"use client";
import React, { useState, RefObject, FormEvent } from "react";
import { FiEdit } from "react-icons/fi";
import Modal from "./Modal";

interface ModalFormEditProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  nameRef: RefObject<HTMLInputElement>;
  priorityRef: RefObject<HTMLInputElement>;
}

const ModalFormEdit = ({
  handleSubmit,
  nameRef,
  priorityRef,
}: ModalFormEditProps) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  return (
    <>
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
    </>
  );
};

export default ModalFormEdit;
