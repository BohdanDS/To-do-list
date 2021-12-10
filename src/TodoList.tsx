import React, {ChangeEvent, useState} from "react";
import {FilterType, TaskType} from "./App";
import Input from "./components/Input";
import Button from "./components/Button";
import InputCheckbox from "./components/InputCheckbox";
import s from "./ToDoList.module.css"


export type ToDoListPropsType = {
    toDoListTitle: string
    tasks: Array<TaskType>
    removeTask: (todoListId:string, taskId: string) => void
    addTaskApp: (todoListId:string,title: string) => void
    changeStatus: (todoListId:string, taskId: string, isDone: boolean) => void
    todoListId: string
    removeTodoList: (todoListId:string) =>void
    changeFilter:(todoListId:string, value:FilterType) =>void
    filter: FilterType
}

function ToDoList({toDoListTitle, tasks, removeTask, addTaskApp, changeStatus, todoListId,removeTodoList, changeFilter, filter}: ToDoListPropsType) {

    // const [filter, setFilter] = useState<FilterType>("all")
    const [error, setError] = useState<string>('')


    const [title, setTitle] = useState<string>('')

    const taskJSX = tasks.map(task => {

        const removeTaskHandler = () => removeTask(todoListId, task.id)
        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(todoListId, task.id, e.currentTarget.checked)
        }
        return (
            <li key={task.id} className={task.isDone ? s.isDone : ''}>
                <InputCheckbox callback={changeStatusHandler} isDone={task.isDone}/> <span>{task.title}</span>
                <Button btnTitle={'x'} callback={removeTaskHandler} filter ={filter}/>
            </li>)
    })

    const addTask = () => {
        if (title.trim()) {
            addTaskApp(todoListId,title.trim())
            setTitle('')
        } else {
            setError('Enter valid task')
        }
    }

    const removeTodoListHandler = () => {
      removeTodoList(todoListId)
    }

    return (
        <div>
            <h3>{toDoListTitle}<button onClick={removeTodoListHandler}>X</button></h3>
            <div>
                <Input title={title} callback={setTitle} addTask={addTask} setError={setError} error={error}/>
                <Button btnTitle={"+"} callback={addTask} filter ={filter}/>
                <div className="error-message">{error}</div>
            </div>
            <ul>
                {taskJSX}
            </ul>
            <div>
                <Button btnTitle={'all'} callback={() => changeFilter(todoListId,'all')} filter ={filter}/>
                <Button btnTitle={'active'} callback={() => changeFilter(todoListId,'active')} filter ={filter}/>
                <Button btnTitle={'completed'} callback={() => changeFilter(todoListId,'completed')} filter ={filter}/>
            </div>
        </div>
    )
}

export default ToDoList