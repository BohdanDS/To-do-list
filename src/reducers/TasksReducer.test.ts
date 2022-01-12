import {addTaskAC, changeTaskStatusAC, TasksReducer, updateTaskTitleAC} from "./TasksReducer";
import {v1} from "uuid";
import {createTodoListAC} from "./TodoListReducer";

let todolistId1: string;
let todolistId2: string;

let startState: any


beforeEach(() => {

    todolistId1 = "todolistId1";
    todolistId2 = "todolistId2";
    startState = {
        [todolistId1]: [
            {id: '5', title: "HTML&CSS", isDone: true},
            {id: '1', title: "JS", isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true}
        ]
    }
})


test('ADD_TASK', () => {

    let result = TasksReducer(startState, addTaskAC(todolistId1, 'TestTask'))
    expect(result[todolistId1].length).toBe(4)


})
test('correct task should be added to correct array', () => {

    const endState = TasksReducer(startState, addTaskAC("todolistId2", "juice"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    // expect(endState["todolistId2"][0].id).toBeDefined();
    // expect(endState["todolistId2"][3].title).toBe('juice');
    // expect(endState["todolistId2"][3].isDone).toBe(false);
})

test('status of specified task should be changed', () => {


    const endState = TasksReducer(startState, changeTaskStatusAC('todolistId1', '1', true))

    expect(endState["todolistId1"][0].isDone).toBe(true);
});


test('title of specified task should be changed', () => {


    const endState = TasksReducer(startState, updateTaskTitleAC('todolistId1', '1', 'updatedTitle'))

    expect(endState["todolistId1"][1].title).toBe('updatedTitle');
});
// test('new array should be added when new todolist is added', () => {
//
//
//     const action = createTodoListAC('3', "new todolist");
//
//     const endState = TasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });

