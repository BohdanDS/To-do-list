import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterType = "all" | "active" | "completed"

function App() {

    const toDoListTitle: string = "What to Learn"

    const [filter, setFilter] = useState<FilterType>("all")


    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: false},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}])

    const removeTask = (taskId: number) => {
        // const upDatedTasks = tasks.filter(task => task.id !== taskId)
        // setTasks(upDatedTasks)
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    let taskForRender = tasks
    if (filter === "active") {
        taskForRender = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
        taskForRender = tasks.filter((task => task.isDone))
    }

    return (
        <div className="App">
            <TodoList title={toDoListTitle}
                      task={taskForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>);
}

export default App;
