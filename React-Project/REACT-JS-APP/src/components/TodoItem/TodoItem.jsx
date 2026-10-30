import React from "react"
import "./TodoItem.css"

const TodoItem = {{ todo }} => {
    return <li className="item">{{ todo.text }}</li>
}

export default TodoItem