import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from "./components/Input";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, createTaskArrAC, removeTaskAC, updateTaskTitleAC} from "./reducers/TasksReducer";
import {createTodoListAC, removeTodoListAC, updateTitleAC} from "./reducers/TodoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./Store/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let dispatch = useDispatch()
    let todoListsStore = useSelector<rootReducerType, Array<TodolistType>>(state => state.todoLists) as Array<TodolistType>


    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }, [dispatch])


    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodoListAC(id))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let todoListId = v1()
        dispatch(createTodoListAC(todoListId, title))
        dispatch(createTaskArrAC(todoListId))
    }, [dispatch])

    const updateTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleAC(todoListId, taskId, title))
    }, [dispatch])

    const updateTitle = useCallback((todoListId: string, title: string) => {
        dispatch(updateTitleAC(todoListId, title))
    }, [dispatch])


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <span>Add new Todo list:</span>
                <Grid container style={{padding: "20px"}}>
                    <Input addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsStore.map(tl => {
                        return (

                            <Grid item>
                                <Paper style={{padding: "10px", margin: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        todoListId={tl.id}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        removeTodolist={removeTodolist}
                                        updateTaskTitle={updateTaskTitle}
                                        updateTitle={updateTitle}
                                        filter={tl.filter}
                                        title={tl.title}
                                    />
                                </Paper>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;