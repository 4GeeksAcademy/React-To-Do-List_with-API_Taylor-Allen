import React, { useState } from "react";
import { Trash } from 'react-bootstrap-icons'
import { PlusCircleFill } from 'react-bootstrap-icons'
import "/workspaces/React-To-Do-List_Taylor-Allen/src/styles/index.css"
    
function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

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
        <div className="container text-center w-25">
            <h1>Taylor's To-Dos</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group"> 
                    <input type="text" value={inputValue} onChange={handleChange} className="form-control border border-1 rounded-pill" />
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
                                <Trash size={20} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ToDoList;
