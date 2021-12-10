import React from "react";
import s from "./Button.module.css"
import {FilterType} from "../App";

type propsType = {
    btnTitle: string
    callback: () => void
    filter:FilterType
}

const Button = ({btnTitle, callback,filter}:propsType) => {
    return (
        <>
            <button className={filter===btnTitle? s.activeFilter: ''} onClick={callback}>{btnTitle}</button>
        </>
    )
}

export default Button