import React, {useState, ChangeEvent, KeyboardEvent, KeyboardEventHandler} from "react";
import {FilterType, TaskType} from "./App";

type ListType = {
    title: string
    task: Array<TaskType>
    removeTask: (task: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}

function TodoList(props: ListType) {

    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        if (title) {
            props.addTask(title)
            setTitle('')
        }
    }

    const taskJSX = props.task.map(t => {

        const onClickHandler = () => props.removeTask(t.id)

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        {
            if (e.key === 'Enter') {
                addTask()
            }
        }
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {taskJSX}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList