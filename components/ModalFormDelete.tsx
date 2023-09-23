"use client";
import React, { Dispatch } from "react";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";

interface ModalFormDeleteProps {
  handleDelete: () => Promise<void>;
  setOpenModalDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  openModalDeleted: boolean;
}

const ModalFormDelete = ({
  handleDelete,
  setOpenModalDeleted,
  openModalDeleted,
}: ModalFormDeleteProps) => {
  return (
    <>
      <FiTrash2
        onClick={() => setOpenModalDeleted(true)}
        cursor="pointer"
        className="text-red-500"
        size={25}
      />
      <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
        <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
        <div className="modal-action">
          <button onClick={() => handleDelete()} className="btn">
            Yes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModalFormDelete;
