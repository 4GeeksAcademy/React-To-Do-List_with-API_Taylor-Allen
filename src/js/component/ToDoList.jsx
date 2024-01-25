import React, { useEffect, useState } from "react";
import { X } from 'react-bootstrap-icons'
import { PlusCircleFill } from 'react-bootstrap-icons'
    
function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const numberComplete = todos.filter(t => t.done).length;
    const numberTotal = todos.length;

    useEffect(() => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/taylor-allen') 
    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        console.log(resp.text()); // Will try to return the exact result as a string
        return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
    })
    .then(data => {
        // Here is where your code should start after the fetch finishes
        console.log(data); // This will print on the console the exact object received from the server
    })
    .catch(error => {
        // Error handling
        console.log(error);
    });

    }, [])

    function handleChange(e) {
        setInputValue(e.target.value);

        
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Check if inputValue is not empty before adding it to todos
        if (inputValue.trim() !== '') {
            setTodos([...todos, inputValue]);
            setInputValue('');
        }
        fetch('https://playground.4geeks.com/apis/fake/todos/user/taylor-allen', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ label: "Make the bed", done: false },
        { label: "Walk the dog", done: false },
        { label: "Do the replits", done: false }]),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    function handleDelete(index) {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <div className="container w-25">
            <h1 className="text-center">Taylor's To-Dos</h1>
            <label for="validationCustomUsername" class="form-label"></label>
            <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="input-group m-0 p-0"> 
                    <input type="text" placeholder="What's on your mind?" value={inputValue} onChange={handleChange} className="form-control border border-1 rounded-pill" required />
                    <div className="input-group-append">
                        <button type="submit" className="btn"><PlusCircleFill size={20}/></button>
                    </div>
                </div>
            </form>
            {todos.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center">
                            {todo}
                            <button onClick={() => handleDelete(index)} class="btn">
                                <X size={20} />
                            </button>
                        </li>
                    ))}
                    
                
                </ul>
                
            )}
            <div className="footer text-muted">
                    <p2>{numberTotal} Task(s) Left</p2>
                </div>
            </div>
            
        </div>
    )
}

export default ToDoList;
