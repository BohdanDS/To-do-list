import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


let todoListId1 = v1();
let todoListId2 = v1();

export let initialState :Array<TodolistType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"},
]

export const TodoListReducer = (state = initialState , action:ActionsTypes) : Array<TodolistType> => {
    switch (action.type){
        case 'CHANGE-FILTER': return state.map(m=>m.id===action.payload.todolistId ? {...m, filter: action.payload.value}:m)
        case "REMOVE-TODOLIST": return state.filter(f=>f.id !== action.payload.todolistId)
        case 'UPDATE-TODOLIST-TITLE': return state.map(m=> m.id === action.payload.todoListId ? {...m, title: action.payload.title}:m)
        case 'ADD-TODOLIST':
            let newTodoList: TodolistType = {id: action.payload.todoListId, title: action.payload.title, filter: "all" as FilterValuesType}
            return [...state, newTodoList]
        default: return state
    }
};

type ActionsTypes = changeFilterACType | removeTodoListACType | updateTitleACType | createTodoListACType

type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload:{
            todolistId,
            value
        }
    } as const
}

type removeTodoListACType = ReturnType<typeof removeTodoListAC>

export const removeTodoListAC = (todolistId:string) =>{
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

type updateTitleACType = ReturnType<typeof updateTitleAC>
export const updateTitleAC = (todoListId: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todoListId,
            title
        }
    } as const
}

type createTodoListACType = ReturnType<typeof createTodoListAC>

export const createTodoListAC = (todoListId:string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todoListId,
            title
        }
    } as const
}

