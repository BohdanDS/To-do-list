import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../reducers/TasksReducer";
import {TodoListReducer} from "../reducers/TodoListReducer";

let rootReducer = combineReducers({
    tasks:TasksReducer,
    todoLists: TodoListReducer
}
)

export type rootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)