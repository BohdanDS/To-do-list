import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styled from "styled-components";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [active, setActive] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(props.title)


    const onDoubleClickHandler = () => {
        setActive(true)
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(event.currentTarget.value)
    }

    const onBlurHandler = () => {
        setActive(false)
        props.callback(localTitle)
    }
    const keyEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.callback(localTitle)
            setActive(false)
        }
    }

    return (
        <>
            {active ?
                <StyleForTextArea><TextField id="standard-basic" variant="standard" value={localTitle}
                                             onChange={onChangeInputHandler} onBlur={onBlurHandler} autoFocus
                                             onKeyPress={keyEnterHandler}/></StyleForTextArea>

                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>}
        </>
    );
});
let StyleForTextArea = styled.span`
  .MuiInput-root, .MuiInput-underline, .MuiInputBase-root, .MuiInputBase-colorPrimary, .MuiInputBase-formControl, .css-1480iag-MuiInputBase-root-MuiInput-root {
    //font-size: 14px;
    max-height: 17px;
    max-width: 100px;
  }`

