import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Task = ({
  id,
  taskName,
  taskTime,
  checked,
  toggleEdit,
  deleteTask,
  checkTask,
}) => {
  const convertDate = (taskDate) => {
    const newDate = new Date(taskDate);
    const dateToday =
      newDate.toLocaleString("default", {
        month: "long",
      }) +
      " " +
      newDate.getUTCDate();

    return dateToday;
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="task-container">
        <div className="d-flex align-items-center">
          <input
            className="m-3 ms-4 check-box-color"
            type="checkbox"
            onChange={() => checkTask(id)}
            checked={checked}
          />
          <div className="px-4 pt-1">
            <p className={`${checked ? "strikeout" : ""} mb-0 fs-5 fw-bold`}>
              {taskName}
            </p>
            <p className={`${checked ? "text-muted" : ""} mb-0 fst-italic`}>
              {convertDate(taskTime)}
            </p>
          </div>
        </div>
        <div>
          <button className="button-edit" onClick={() => toggleEdit(id)}>
            <AiOutlineEdit />
          </button>
          <button className="button-delete" onClick={() => deleteTask(id)}>
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
