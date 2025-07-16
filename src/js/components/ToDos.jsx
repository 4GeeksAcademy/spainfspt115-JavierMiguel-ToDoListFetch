import React, { useState, useEffect } from 'react';
import { TodoList } from './ToDoList';

export const ToDos = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const username = "JavierMV";

	const apiUser = `https://playground.4geeks.com/todo/users/${username}`;
	const apiTodos = `https://playground.4geeks.com/todo/todos/${username}`;

	const createUser = async () => {
		const response = await fetch(apiUser, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: username })
		});

		if (response.ok) {
			console.log("User created");
		} else if (response.status === 400) {
			console.log("User already exists");
		} else {
			console.log("Error creating user");
		}
	};

	const loadTodos = async () => {
		const response = await fetch(apiUser);
		if (response.ok) {
			const data = await response.json();
			setTodos(data.todos || []);
			console.log("Todos loaded");
		} else {
			console.log("Failed to load user's todos");
		}
	};

	const createTodo = async (label) => {
		const response = await fetch(apiTodos, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				label: label,
				is_done: false
			}),
		});

		if (response.ok) {
			await loadTodos();
			console.log("Todo created");
		} else {
			console.log("Failed to create ToDo");
		}
	};

	const deleteTodo = async (id) => {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		});

		if (response.ok) {
			setTodos(todos.filter(todo => todo.id !== id));
			console.log("Todo deleted");
		} else {
			console.log("Failed to delete ToDo");
		}
	};

	useEffect(() => {
		const init = async () => {
			await createUser();
			await loadTodos();
		};

		init();
	}, []);

	const addTodo = () => {
		if (newTodo.trim() !== "") {
			createTodo(newTodo.trim());
			setNewTodo("");
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addTodo();
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center vh-100 bg-light">
			<div className="bg-white shadow rounded w-100 p-4" style={{ maxWidth: '500px' }}>
				<h1 className="text-center text-muted display-4 fw-light mb-4">ToDos</h1>

				<input
					type="text"
					className="form-control border-0 border-bottom rounded-0 mb-3"
					placeholder="What needs to be done?"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<div className="overflow-auto mb-3" style={{ maxHeight: "300px" }}>
					<TodoList todos={todos} deleteTodo={deleteTodo} />
				</div>

				<div className="text-muted small mt-3">{todos.length} items left</div>
			</div>
		</div>
	);
};
