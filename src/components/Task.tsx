import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    todoListId: string
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean,) => void
    updateTaskTitle: (todoListId: string, taskId: string, title: string) => void
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.todoListId, props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.todoListId, props.task.id, newIsDoneValue);
    }

    const localTaskTitleHandler = useCallback((taskTitle: string) => {
        props.updateTaskTitle(props.todoListId, props.task.id, taskTitle)
    }, [props.updateTaskTitle, props.todoListId, props.task.id])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} callback={localTaskTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});

