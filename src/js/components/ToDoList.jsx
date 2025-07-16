import { useState } from 'react';
import { TodoItem } from "./ToDoItem";

export const TodoList = ({ todos, deleteTodo }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ul
      className="list-group border-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => deleteTodo(todo.id)}
          showDelete={hovered}
        />
      ))}
    </ul>
  );
};
