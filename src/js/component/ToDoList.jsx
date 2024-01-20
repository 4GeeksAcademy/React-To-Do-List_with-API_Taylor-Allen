import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    
    function ToDoList () {

        const [todos, setTodos] = useState([]);
        const [inputValue, setInputValue] = useState('');

        function handleChange(e){
            setInputValue(e.target.value)
        }

        function handleSubmit(e){
            e.preventDefault()
            setTodos([...todos, inputValue])
            setInputValue('')
        }

        function handleDelete(index){
            const newTodos = [...todos]
            newTodos.splice(index, 1)
            setTodos(newTodos)
        }
        return (
            <div className="container">
                <h1>Taylor's To-Dos</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                    <input type="text" value={inputValue} onChange={handleChange} />
                    {/* <button onClick={handleSubmit} >Add New Task</button> */}
                    </label>
                </form>
                {todos.length === 0 ? (
                    <p>No tasks yet.</p>
                ) : (
                    <ul>
                        {todos.map((todo, index) => (
                        <li key={index}>{todo}
                        <button onClick={() => handleDelete(index)}><FontAwesomeIcon icon={faTrash} /></button>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        )
    }

export default ToDoList;