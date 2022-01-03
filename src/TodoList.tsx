import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksStateType, TodolistType} from './App';
import Input from "./components/Input";
import EditableSpan from "./components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./Store/store";
import {changeFilterAC} from "./reducers/TodoListReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean,) => void
    removeTodolist: (id: string) => void
    updateTaskTitle: (todoListId: string, taskId: string, title: string) => void
    updateTitle: (todoListId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    let dispatch = useDispatch()
    let todoListsStore = useSelector<rootReducerType, Array<TodolistType>>(state => state.todoLists) as Array<TodolistType>
    let tasksStore = useSelector<rootReducerType, TasksStateType>(state => state.tasks) as TasksStateType


    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todoListId, value))
    }

    return (
        <div>
            {todoListsStore.map(tl => {

                const addTask = (title: string) => {
                    props.addTask(tl.id, title)
                }
                let tasksForTodolist = tasksStore[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasksStore[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksStore[tl.id].filter(t => t.isDone === true);
                }

                const removeTodolist = () => props.removeTodolist(tl.id)
                const onAllClickHandler = () => changeFilter(tl.id, "all");
                const onActiveClickHandler = () => changeFilter(tl.id, "active");
                const onCompletedClickHandler = () => changeFilter(tl.id, "completed");

                const localTaskTitleHandler = (taskId: string) => {
                    return (title: string) => {
                        props.updateTaskTitle(tl.id, taskId, title)
                    }
                }

                const todoListTitleHandler = (title: string) => {
                    props.updateTitle(tl.id, title)
                }
                return (
                    <div>
                        <h3><EditableSpan title={tl.title} callback={todoListTitleHandler}/>
                            <DeleteIcon onClick={removeTodolist}>x</DeleteIcon>
                        </h3>
                        <div>
                            <Input addItem={addTask}/>
                        </div>
                        <ul>
                            {
                                tasksForTodolist.map(t => {
                                    const onClickHandler = () => props.removeTask(tl.id, t.id)
                                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                        let newIsDoneValue = e.currentTarget.checked;
                                        props.changeTaskStatus(tl.id, t.id, newIsDoneValue);
                                    }

                                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                        <EditableSpan title={t.title} callback={localTaskTitleHandler(t.id)}/>
                                        <DeleteIcon onClick={onClickHandler}>x</DeleteIcon>
                                    </li>
                                })
                            }
                        </ul>
                        <div>
                            <ButtonGroup variant="text" aria-label="text button group" size='small' color='primary'>
                                <Button color={tl.filter === 'all' ? "secondary" : "primary"}
                                        onClick={onAllClickHandler}>All
                                </Button>
                                <Button color={tl.filter === 'active' ? "secondary" : "primary"}
                                        onClick={onActiveClickHandler}>Active
                                </Button>
                                <Button color={tl.filter === 'completed' ? "secondary" : "primary"}
                                        onClick={onCompletedClickHandler}>Completed
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


