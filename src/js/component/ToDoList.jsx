import React, { useState } from "react";
import { Trash, X } from 'react-bootstrap-icons'
import { PlusCircleFill } from 'react-bootstrap-icons'
import "/workspaces/React-To-Do-List_Taylor-Allen/src/styles/index.css"

    
function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const numberComplete = todos.filter(t => t.done).length;
    const numberTotal = todos.length;

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
