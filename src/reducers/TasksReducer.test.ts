import {addTaskAC, changeTaskStatusAC, removeTaskAC, TasksReducer} from "./TasksReducer";
import {v1} from "uuid";

test('ADD_TASK', () => {
//    Test data
    let todolistId1 = v1();
    let todolistId2 = v1();
    // let todolists = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"},
    // ]
    let tasks = {
        [todolistId1]: [
            {id: '5', title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true}
        ]
    }
    let result = TasksReducer(tasks, addTaskAC(todolistId1, 'TestTask'))
    expect(result[todolistId1].length).toBe(4)

    let result2 = TasksReducer(tasks, removeTaskAC(todolistId1, '5'))
    expect(result2[todolistId1][0].title).toBe('JS')

    let result3 = TasksReducer(tasks, changeTaskStatusAC(todolistId1, '5', false))
    expect(result3[todolistId1][0].isDone).toBe(false)
})
