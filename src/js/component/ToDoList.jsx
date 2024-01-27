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
      .then((resp) => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
      })
      .then((setTodos) => {
        // Here is where your code should start after the fetch finishes
        console.log(setTodos); // This will print on the console the exact object received from the server
      })
      .catch((error) => {
        // Error handling
        console.log(error);
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
      setTodos([...todos, inputValue]);
      setInputValue("");
    }

    const newTask = [...todos, { label: inputValue, done: false }];

    fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.status === 200 ? setTodos(newTask) : "";
      })
      .then((todos) => console.log(todos));
  }

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  // function handleClearAll() {
  //   // fetch(apiURL, {
  //   //   method: "DELETE",
  //   //   body: JSON.stringify(todos),
  //   // })
  //   //   .then((response) => {
  //   //     if (response.status === 204) {
  //   //       setTodos([]);
  //   //     }
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error:", error);
  //   //   });
  // }

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

        {/* <button onClick={handleClearAll} className="btn btn-danger mt-3">Clear All</button> */}

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
        <div>
          <p id="p2" className="d-flex justify-content-start">
            {numberTotal} Task(s) Left
          </p>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
