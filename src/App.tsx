import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = "all" | "active" | "completed"

function App() {

    const toDoListTitle: string = "What to Learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}])

    const [filter, setFilter] = useState<FilterType>("all")

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    let taskForRender = tasks
    if (filter === "active") {
        taskForRender = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
        taskForRender = tasks.filter((task => task.isDone))
    }

    const removeTask = (taskId: string) => {
        // const upDatedTasks = tasks.filter(task => task.id !== taskId)
        // setTasks(upDatedTasks)
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const addTask = (title: string) => {
        let addedTask: TaskType = {id: v1(), title: title, isDone: false}
        let newTasks = [addedTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <TodoList title={toDoListTitle}
                      task={taskForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>);
}

export default App;
