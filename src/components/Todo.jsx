import React from "react";
import { useState, useEffect } from "react";
import styles from "./Todo.module.css";
import Items from "./Items";

const Todo = () => {
  // states
  const [input, setInput] = useState("");
  const [list, setList] = useState(
    () => JSON.parse(localStorage.getItem("todoList")) || [],
  );
  const [editId, setEditId] = useState(null);

  // we use UseEffect for storing data on local storage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  // even listeners
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  // For Add Task
  const addTaskHandler = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      alert("Please enter something!");
      return;
    }

    const task = {
      id: Math.floor(Math.random() * 1000000),
      name: input,
      status: "pending",
    };

    setList([...list, task]);
    setInput("");
  };

  // For Clear All Task
  const clearTaskHandler = () => {
    if (window.confirm("Clear all tasks?")) setList([]);
  };

  // For Mark Done Task also add toggle effect
  const markTaskHandler = (id) => {
    const markTask = list.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          status: element.status === "pending" ? "completed" : "pending",
        };
      }
      return element;
    });

    setList(markTask);
  };

  // For Delete Task
  const deleteTaskHandler = (id) => {
    const deleteTask = list.filter((element) => element.id !== id);
    setList(deleteTask);
  };

  // For Edit Task
  const editIdHandler = (id) => {
    const findTask = list.find((element) => element.id === id);
    setInput(findTask.name);
    setEditId(id);
  };

  const editTaskHandler = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      alert("Please enter something!");
      return;
    }

    const editTask = list.map((element) => {
      if (element.id === editId) {
        return { ...element, name: input };
      }
      return element;
    });

    setList(editTask);
    setEditId(null);
    setInput("");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputBox}>
        <h1>Make Your To-Do List</h1>

        <div>
          <p>Add Your Items Here ✏️</p>
          <form onSubmit={editId !== null ? editTaskHandler : addTaskHandler}>
            <input
              type="text"
              placeholder="Enter your item"
              value={input}
              onChange={inputHandler}
            />
            {editId !== null ? (
              <button type="submit">Update Task</button>
            ) : (
              <button type="submit">Add Task</button>
            )}
          </form>
        </div>
      </div>

      <h3>Your Tasks</h3>
      {list.length === 0 && <p style={{ color: "gray" }}>No tasks available</p>}

      <ul>
        {list.map((element) => (
          <Items
            key={element.id}
            task={element}
            onMark={markTaskHandler}
            onDelete={deleteTaskHandler}
            onEdit={editIdHandler}
          />
        ))}
      </ul>

      {list.length !== 0 && (
        <div className={styles.clearAll}>
          <button onClick={clearTaskHandler}>Clear All</button>
        </div>
      )}
    </div>
  );
};

export default Todo;
