import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = "all" | "active" | "completed"

export type TodoListsType = {
    id:string
    title:string
    filter: FilterType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn2', filter: 'all'},
        {id: todolistID2, title: 'What to buy2', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todoListId:string, taskId: string) {
        // setTaskArray(taskArray.filter(task => task.id !== taskId))

        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(f=>f.id !==taskId)})
    }

    function addTask(todoListId:string, title: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const newTasksArray: Array<TaskType> = [newTask, ...taskArray]
        // setTaskArray(newTasksArray)
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
    }

    function changeStatus(todoListId:string, taskId:string, isDone:boolean)  {
        // let task = taskArray.find(task=> task.id === taskId)
        // if(task){
        //     task.isDone = isDone
        // }
        // setTaskArray([...taskArray])
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(m => m.id === taskId ? {...m, isDone }: m)})
    }

    function removeTodoList(todoListId:string) {
        setTodoLists(todoLists.filter(f => f.id !== todoListId))
    }


    return (
        <div className="App">

            {
                todoLists.map(m => {
                    let tasksForTodoList = tasks[m.id]
                    return(
                        <ToDoList
                            key = {m.id}
                            todoListId = {m.id}
                            toDoListTitle={m.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            // changeFilter={changeFilter}
                            addTaskApp={addTask}
                            changeStatus = {changeStatus}
                            removeTodoList = {removeTodoList}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
