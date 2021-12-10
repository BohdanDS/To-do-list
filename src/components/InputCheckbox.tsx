import React, {ChangeEvent} from "react";

type PropsType = {
    callback:(e:ChangeEvent<HTMLInputElement>)=>void
    isDone:boolean
}

const InputCheckbox = ({callback, isDone}:PropsType) => {
    return <input type="checkbox" checked={isDone} onChange={callback}></input>
}

export default InputCheckbox