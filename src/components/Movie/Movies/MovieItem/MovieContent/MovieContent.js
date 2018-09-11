import React from 'react';
import classes from './MovieContent.css';

const movieContent = (props) => (
    <div className={classes.MovieContent}>
        <h5>{props.title}</h5>
        <div className={classes.ContentInfo}>
            <small>year: {props.year}</small>
            <small>type: {props.type}</small>
        </div>
    </div>
);

export default movieContent;