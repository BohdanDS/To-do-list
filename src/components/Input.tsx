import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddIcon from '@mui/icons-material/Add'
import {TextField} from "@mui/material";
import styled from "styled-components";

type InputPropsType = {
    addItem: (title: string) => void
}

const Input = React.memo(function (props: InputPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div>
            <StyleForTextArea><TextField id="standard-basic" variant="standard" value={title}
                                         onChange={onChangeHandler}
                                         onKeyPress={onKeyPressHandler}
                                         className={error ? "error" : ""}
                                         error={!!error}
            /></StyleForTextArea>
            <AddIcon onClick={addItem}>+</AddIcon>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

let StyleForTextArea = styled.span`
  .MuiOutlinedInput-input, .MuiInputBase-input, .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    //font-size: 14px;
    line-height: 20%;
    max-height: 17px;
    max-width: 150px;
  }`


export default Input;