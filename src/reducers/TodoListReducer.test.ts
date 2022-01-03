export {}
//
// import {changeFilterAC, createTodoListAC, removeTodoListAC, TodoListReducer, updateTitleAC} from './TodoListReducer'
// import {v1} from 'uuid';
// import {FilterValuesType, TodolistType} from '../App';
//
// test('RemoveTodoList', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     const startState: Array<TodolistType> = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
//
//     const endState = TodoListReducer(startState, removeTodoListAC(todolistId1))
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
//
// });
//
// test('AddTodoList', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//     let todolistId3 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     const startState: Array<TodolistType> = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
//
//     const endState = TodoListReducer(startState, createTodoListAC(todolistId3, newTodolistTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
// });
//
// test('ChangeTodoListTitle', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     const startState: Array<TodolistType> = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
//     const endState = TodoListReducer(startState, updateTitleAC(todolistId2,newTodolistTitle ));
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
//
// test('correct filter of todolist should be changed', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newFilter: FilterValuesType = "completed";
//
//     const startState: Array<TodolistType> = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
//     const endState = TodoListReducer(startState, changeFilterAC(todolistId2, newFilter));
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });