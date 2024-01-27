import React, { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import { PlusCircleFill } from "react-bootstrap-icons";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const numberTotal = todos.length;
  const apiURL =
    "https://playground.4geeks.com/apis/fake/todos/user/taylor-allen";

  const updateTasks = () => {
    fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    updateTasks();
  }, []);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check if inputValue is not empty before adding it to todos
    if (inputValue.trim() !== "") {
      const newTask = { label: inputValue, done: false };

      setTodos([...todos, newTask]);
      setInputValue("");

      fetch(apiURL, {
        method: "PUT",
        body: JSON.stringify([...todos, newTask]),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            console.error("Failed to update the task on the server.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);

    setTodos(newTodos);

    fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(newTodos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.error("Failed to update the task on the server.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleClearAll() {
    const deleteAll = [{ label: "required proxy task", done: false }];

    fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(deleteAll),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setTodos(deleteAll);
        } else {
          console.error("Failed to clear all tasks on the server.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="container w-25">
      <h1 className="text-center">Taylor's To-Dos</h1>
      <label htmlFor="validationCustomUsername" className="form-label"></label>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-group m-0 p-0">
            <input
              type="text"
              placeholder="What's on your mind?"
              value={inputValue}
              onChange={handleChange}
              className="form-control border border-1 rounded-pill"
              required
            />
            <div className="input-group-append">
              <button type="submit" className="btn">
                <PlusCircleFill size={20} />
              </button>
            </div>
          </div>
        </form>

        {todos.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                {todo.label}
                <button onClick={() => handleDelete(index)} className="btn">
                  <X size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="d-flex justify-content-between">
          <p id="p2" className="d-flex justify-content-start">
            {numberTotal} Task(s) Left
          </p>
          <button
            onClick={handleClearAll}
            className="btn d-flex justify-content-end p-0 m-0"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
