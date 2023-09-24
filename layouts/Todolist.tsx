import Task from "@/layouts/Task";
import AddTask from "@/layouts/AddTask";

const Todolist = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <div className="mb-5">
          <AddTask />
        </div>
        <table className="table w-full">
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
    </>
  );
};

export default Todolist;
