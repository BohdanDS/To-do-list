import React from "react";
import {FilterType, TaskType} from "./App";

type ListType = {
    title: string
    task: Array<TaskType>
    removeTask: (task : number) => void
    changeFilter: (filter: FilterType) => void
}

function TodoList(props: ListType) {
    const taskJSX = props.task.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskJSX}
            </ul>
            <div>
                <button onClick={()=> props.changeFilter("all")}>All</button>
                <button onClick={()=> props.changeFilter("active")}>Active</button>
                <button onClick={()=> props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList