import React from 'react';
import classes from './MovieImage.css';

const movieImage = (props) => (
    <img className={classes.MovieImage} src={props.img} alt={props.img}/>
);

export default movieImage;