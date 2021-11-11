import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {
    const task1 = [
        {id:1, title: "HTML&CSS", isDone: false},
        {id:1, title: "JS", isDone: true},
        {id:1, title: "React", isDone: false}
    ]
    const task2 = [
        {id:1, title: "Hello World", isDone: true},
        {id:1, title: "I am happy", isDone: true},
        {id:1, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title = 'What to learn' task= {task1}/>
            <Todolist title = 'Songs' task= {task2}/>
        </div>);
}

export default App;
