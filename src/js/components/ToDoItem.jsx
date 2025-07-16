import React from 'react';

export const TodoItem = ({ todo, onDelete, showDelete }) => (
    <li className="list-group-item border-0 border-bottom position-relative">
        {todo.label}
        <button
            className={`btn btn-sm position-absolute top-0 end-0 text-danger border-0 
            ${showDelete ? 'd-inline' : 'd-none'}`}
            onClick={onDelete}
        >
            X
        </button>
    </li>
);
