import React from "react";
import Task from "./Task";

const Todolist = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <Task />
        </tbody>
      </table>
    </div>
  );
};

export default Todolist;
