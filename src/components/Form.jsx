import React, { useState } from "react";
import { RiAddFill } from "react-icons/ri";

const Form = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(taskName, taskTime);
    document.getElementById("task-name").value = "";
    document.getElementById("task-time").value = "";
  };

  return (
    <div className="form-task">
      <h1 className="form-title">What tasks do you have?</h1>
      <form className="row w-100 form-container" onSubmit={handleSubmit}>
        <div className="col-8 p-0 ">
          <label htmlFor="task-name">Task Name</label>
          <br />
          <input
            type="text"
            id="task-name"
            placeholder="Add task here..."
            onChange={(event) => {
              setTaskName(event.target.value);
            }}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="task-time">Target Date</label>
          <br />
          <input
            type="date"
            id="task-time"
            onChange={(event) => {
              setTaskTime(event.target.value);
            }}
            required
          />
        </div>
        <button className="col add-button"><RiAddFill/></button>
      </form>
    </div>
  );
};

export default Form;
