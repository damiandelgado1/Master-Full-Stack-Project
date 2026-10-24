import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"

const TodoList = () => {
    const [todos, setTodos] = useState([])

    const [newTodo, setNewTodo] = useState("")

    const handleInputChange = (e) => {
        setNewTodo(e.target.value)
    }

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || []

        setTodos[savedTodos]
    }, [])

    useEffect(() => {
        document.title = `Mis tareas (${todos.length})`
    }, [todos])

    useEffect(() => {
        const handleEnter = (e) => {
            if (e.key !== "Enter") {
                return
            }
            handleAddTodo()
        }

        window.addEventListener("keydown", handleEnter)

        return () => window.removeEventListener("keydown", handleEnter)
    }, [todos, newTodo])

    const handleAddTodo = () => {
        const newTodo = {
            text: newTodo,
            completed: false,
        }

        setTodos([
            ...todos,
            newTodoItem,
        ])

        setNewTodo("")
    }

    const addTodoLocalStorage = (arrTodos) => {
        localStorage.setItem("todos", JSON.stringify(arrTodos))
    }

    return [
        <div>
            <input type="text" placeholder="Nueva tarea" value={newTodo} onChange={handleInputChange}/>
            
            <ul>
                { todos.map [(todo, index => (
                    <li key={index}> {todo.text} </li>
                ))] }
            </ul>
        </div>
    ]
}

export default TodoList