import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {createTodoListACType, initialState} from "./TodoListReducer";

let initialState1: TasksStateType = {
    [initialState[0].id]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Flux", isDone: true},
        {id: v1(), title: "TEST", isDone: false}
    ],
    [initialState[1].id]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
        {id: v1(), title: "Flux", isDone: true},
        {id: v1(), title: "TEST", isDone: false}
    ]
}

export const TasksReducer = (state = initialState1, action: ActionsTypes) => {
    switch (action.type) {
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todoListID]: [...state[action.payload.todoListID], newTask]}
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(f => f.id !== action.payload.taskId)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    isDone: action.payload.isDone
                } : m)
            }
        case "UPDATE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    title: action.payload.title
                } : m)
            }
        case "CREATE-TASK-ARR":
            return {...state, [action.payload.todoListID]: []}
        default:
            return state
    }
};

export type ActionsTypes =
    addTaskACType
    | removeTaskACType
    | changeTaskStatusACType
    | updateTaskTitleACType
    | createTaskArrACType
    | createTodoListACType

export type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload:
            {
                todoListID: todoListID,
                title: title
            }
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todoListID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload:
            {
                todoListID,
                taskId
            }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todoListID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListID,
            taskId,
            isDone
        }
    } as const
}

type updateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todoListID: string, taskId: string, title: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {
            todoListID,
            taskId,
            title
        }
    } as const
}

type createTaskArrACType = ReturnType<typeof createTaskArrAC>

export const createTaskArrAC = (todoListID: string) => {
    return {
        type: 'CREATE-TASK-ARR',
        payload: {
            todoListID
        }
    } as const
}
