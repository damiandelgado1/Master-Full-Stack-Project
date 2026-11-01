import TodoList from "./components/TodoList"
import Title from "./components/Title"

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900">
      <Title title="Mis Tareas Pendientes"/>
      <TodoList/>
    </div>
  )
}

export default App
