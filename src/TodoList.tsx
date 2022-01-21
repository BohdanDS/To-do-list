import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import Input from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./Store/store";
import {changeFilterAC} from "./reducers/TodoListReducer";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {Task} from "./components/Task";

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
    todoListId: string
    filter: FilterValuesType
    title: string
}

export const Todolist = React.memo((props: PropsType) => {


    let dispatch = useDispatch()
    let tasksStore = useSelector<rootReducerType, Array<TaskType>>(state => state.tasks[props.todoListId]) as Array<TaskType>

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, value))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todoListId, title)
    }, [props.addTask, props.todoListId])


    if (props.filter === "active") {
        tasksStore = tasksStore.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksStore = tasksStore.filter(t => t.isDone === true);
    }
    const removeTodolist = useCallback(() => props.removeTodolist(props.todoListId), [props.removeTodolist, props.todoListId])
    const onAllClickHandler = useCallback(() => changeFilter(props.todoListId, "all"), [props.todoListId])
    const onActiveClickHandler = useCallback(() => changeFilter(props.todoListId, "active"), [props.todoListId])
    const onCompletedClickHandler = useCallback(() => changeFilter(props.todoListId, "completed"), [props.todoListId])

    const todoListTitleHandler = useCallback((title: string) => {
        props.updateTitle(props.todoListId, title)
    }, [props.updateTitle, props.todoListId])

    return (
        <div>
            <h3 style={{margin: '0px'}}><EditableSpan title={props.title} callback={todoListTitleHandler}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <Input addItem={addTask}/>
            </div>
            <div>
                {
                    tasksStore.map(t => {

                        return (
                            <Task key={t.id} removeTask={props.removeTask} addTask={props.addTask}
                                  todoListId={props.todoListId}
                                  changeTaskStatus={props.changeTaskStatus}
                                  updateTaskTitle={props.updateTaskTitle}
                                  task={t}
                            />
                        )
                    })
                }
            </div>
            <div>
                <ButtonGroup variant="text" aria-label="text button group" size='small' color='primary'>
                    <Button color={props.filter === 'all' ? "secondary" : "primary"}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button color={props.filter === 'active' ? "secondary" : "primary"}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={props.filter === 'completed' ? "secondary" : "primary"}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

