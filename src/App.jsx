import { useReducer, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import Task from "./components/Task";
import EditTask from "./components/EditTask";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        {
          id: Math.floor(Math.random() * 1000),
          taskName: action.task.text,
          taskTime: action.task.date,
          checked: false,
          edited: false,
        },
        ...state,
      ];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.id);
    case "CHANGE_CHECK":
      return state.map((task) =>
        task.id === action.id ? { ...task, checked: !task.checked } : task
      );
    case "DELETE_ALL_TASK":
      return (state = []);
    case "COMPLETE_FINISHED_TASK":
      return state.map((task) =>
        task.checked == false ? { ...task, checked: true } : task
      );
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.id ? { ...task, edited: !task.edited } : task
      );
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.task.id
          ? {
              ...task,
              taskName: action.task.text,
              taskTime: action.task.date,
              checked: false,
              edited: !task.edited,
            }
          : task
      );
    default:
      return state;
  }
};

function App() {
  const [taskList, dispatch] = useReducer(taskReducer, [], () => {
    const taskLocalStorage = localStorage.getItem("taskArray");
    return taskLocalStorage ? JSON.parse(taskLocalStorage) : null;
  });

  useEffect(() => {
    localStorage.setItem("taskArray", JSON.stringify(taskList));
  }, [taskList]);

  const handleChangeCheck = (id) => {
    dispatch({ type: "CHANGE_CHECK", id: id });
  };

  const handleAdd = (text, date) => {
    dispatch({ type: "ADD_TASK", task: { text, date } });
  };

  const handleDelete = (id) => {
    return (
      confirm("Are you sure you want to delete this task?") &&
      dispatch({ type: "DELETE_TASK", id: id })
    );
  };

  const handleDeleteAll = () => {
    return taskList.length
      ? confirm("Are you sure you want to delete all task?") &&
          dispatch({ type: "DELETE_ALL_TASK" })
      : alert("No task to be deleted");
  };

  const handleCheckedAll = () => {
    return taskList.length
      ? dispatch({ type: "COMPLETE_FINISHED_TASK" })
      : alert("No task to be checked");
  };

  const handleToggle = (id) => {
    dispatch({ type: "TOGGLE_TASK", id: id });
  };

  const handleEdit = (text, date, id) => {
    dispatch({ type: "EDIT_TASK", task: { text, date, id } });
  };

  return (
    <>
      <div className="todo-container">
        <div className="todo-card">
          <Form addTask={handleAdd} />
          <h1 className="task-list-name">To-Do List</h1>
          {taskList.length ? (
            <div className="todo-list-task">
              {taskList.map((task) =>
                task.edited === true ? (
                  <EditTask
                    id={task.id}
                    editTask={handleEdit}
                    toggleEdit={handleToggle}
                  />
                ) : (
                  <Task
                    key={task.id}
                    id={task.id}
                    taskName={task.taskName}
                    taskTime={task.taskTime}
                    checked={task.checked}
                    deleteTask={handleDelete}
                    checkTask={handleChangeCheck}
                    toggleEdit={handleToggle}
                  />
                )
              )}
            </div>
          ) : (
            <p className="todo-list-no-task">
              Oh no! You have no task right now
            </p>
          )}
          <div className="w-50 d-flex justify-content-evenly">
            <button
              className="btn text-white bg-danger mb-0 mt-4"
              onClick={handleDeleteAll}
            >
              Delete All Tasks
            </button>
            <button className="check-button" onClick={handleCheckedAll}>
              Check All Tasks
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
