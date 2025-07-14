import React, { useState } from 'react';
import { TodoList } from './ToDoList';

export const ToDos = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	const addToDo = () => {
		if (newTodo.trim() !== "") {
			setTodos([...todos, newTodo.trim()]);
			setNewTodo("");

		}
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addToDo();

		}
	}

	const deleteTodo = (indexToDelete) => {
		setTodos(todos.filter((_, index) => index !== indexToDelete));
	};

	console.log(todos);

	return (
		<div className="d-flex justify-content-center align-items-center vh-100 bg-light" >
			<div className="bg-white shadow rounded w-100 p-4 " style={{ maxWidth: '500px' }}>

				<h1 className="text-center text-muted display-4 fw-light mb-4">
					ToDos
				</h1>

				<input
					type="text"
					className="form-control border-0 border-bottom rounded-0 mb-3"
					placeholder="What needs to be done?"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<TodoList todos={todos} deleteTodo={deleteTodo} />

				<div className="text-muted small mt-3">
					{todos.length} items left
				</div>

			</div>
		</div>
	);
};