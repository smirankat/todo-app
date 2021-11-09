import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo, updateTodo } from "../redux/todoSlice";

const TodoItem = ({ id, title, completed, time }) => {
  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    dispatch(toggleComplete({ id: id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodo({ id: id }));
  };
  const handleUpdate = (updatedTitle) => {
    dispatch(updateTodo({ id: id, title: updatedTitle }));
  };
  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };
  const [editing, setEditing] = useState(false);

  let viewMode = {};
  let editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="m-3"
            checked={completed}
            onChange={handleCompleteClick}
          ></input>
          <div onDoubleClick={() => setEditing(true)} style={viewMode}>
            {title}
          </div>
          <input
            onChange={(event) => handleUpdate(event.target.value)}
            onKeyDown={handleUpdatedDone}
            type="text"
            style={editMode}
            value={title}
          />
        </div>
        <div>
          <span className="m-3">{time}</span>
          <button onClick={handleDeleteClick} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
