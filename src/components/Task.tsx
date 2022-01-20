import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TaskType = {
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    todoListId: string
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean,) => void
    updateTaskTitle: (todoListId: string, taskId: string, title: string) => void
    taskId: string
    taskTitle: string
    taskStatus: boolean
}

export const Task = React.memo((props: TaskType) => {

    const onClickHandler = () => props.removeTask(props.todoListId, props.taskId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.todoListId, props.taskId, newIsDoneValue);
    }

    const localTaskTitleHandler = useCallback((taskTitle: string) => {
        props.updateTaskTitle(props.todoListId, props.taskId, taskTitle)
    }, [])

    return (
        <div key={props.taskId} className={props.taskStatus ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={props.taskStatus}/>
            <EditableSpan title={props.taskTitle} callback={localTaskTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});

