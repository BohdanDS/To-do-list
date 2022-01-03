import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from "./components/Input";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, createTaskArrAC, removeTaskAC, updateTaskTitleAC} from "./reducers/TasksReducer";
import {createTodoListAC, removeTodoListAC, updateTitleAC} from "./reducers/TodoListReducer";
import {useDispatch} from "react-redux";


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

    function removeTask(todolistId: string, id: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    function addTask(todolistId: string, title: string) {
        console.log('addTask')
        dispatch(addTaskAC(todolistId, title))
    }

    function changeStatus(todolistId: string, id: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }


    function removeTodolist(id: string) {
        dispatch(removeTodoListAC(id))
    }

    const addTodoList = (title: string) => {
        let todoListId = v1()
        dispatch(createTodoListAC(todoListId, title))
        dispatch(createTaskArrAC(todoListId))
    }

    const updateTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleAC(todoListId, taskId, title))
    }

    const updateTitle = (todoListId: string, title: string) => {
        dispatch(updateTitleAC(todoListId, title))
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <span>Add new Todo list:</span>
                <Grid container style={{padding: "20px"}}>
                    <Input addItem={addTodoList}/>
                </Grid>


                <Grid container spacing={3}>
                    <Grid item>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                updateTaskTitle={updateTaskTitle}
                                updateTitle={updateTitle}
                            />
                        </Paper>
                    </Grid>
                </Grid>


            </Container>

        </div>
    );
}

export default App;
