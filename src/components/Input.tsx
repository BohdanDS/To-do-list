import React, {ChangeEvent, KeyboardEvent} from "react";
import s from "./Input.module.css"




type propsType = {
    title: string
    callback: (title: string) => void
    addTask: () => void
    setError: (message:string) => void
    error:string
}


const Input = ({title, callback, addTask,setError,error}: propsType) => {
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        callback(event.currentTarget.value)
        setError('')
    }

    const onEnterPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log(title)
            addTask()
        }
    }
    let className = error ? s.error : s.default

    return (
        <input value={title} onChange={onChangeTitleHandler} onKeyPress={onEnterPressHandler} className={className}/>
    )
}

export default Input