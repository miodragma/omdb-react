import React from 'react';
import classes from './Input.css';
import { DebounceInput } from 'react-debounce-input';

const input = (props) => {
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>Search:</label>
            <DebounceInput debounceTimeout={300} type='text' value={props.title} onChange={props.changed} />
        </div>
    )
};

export default input;