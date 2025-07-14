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
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          text={todo}
          onDelete={() => deleteTodo(index)}
          showDelete={hovered} // paso si mostrar la X o no
        />
      ))}
    </ul>
  );
};