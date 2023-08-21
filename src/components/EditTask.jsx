import React from "react";
import { useState } from "react";
import { RxCheck, RxCross2 } from "react-icons/rx";

const EditTask = ({ id, editTask, toggleEdit }) => {
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskTime, setEditTaskTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    editTask(editTaskName, editTaskTime, id);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="edit-task-container">
        <form
          className="d-flex justify-content-between align-items-center w-100 ms-2"
          onSubmit={handleSubmit}
        >
          <div className="d-flex w-100 me-4">
            <input
              type="text"
              id="edit-task-name"
              placeholder="Change here..."
              onChange={(event) => {
                setEditTaskName(event.target.value);
              }}
              required
            />
            <input
              type="date"
              id="edit-task-time"
              onChange={(event) => {
                setEditTaskTime(event.target.value);
              }}
              required
            />
          </div>
          <button className="save-button" onSubmit={editTask}>
            <RxCheck className="check"/>
          </button>
        </form>
        <button className="close-button" onClick={() => toggleEdit(id)}>
          <RxCross2 className="cross"/>
        </button>
      </div>
    </div>
  );
};

export default EditTask;
