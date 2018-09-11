import React from 'react';
import classes from './MovieItem.css';

import MovieImage from './MovieImage/MovieImage';
import MovieContent from './MovieContent/MovieContent';

const movieItem = (props) => (
    <div className={classes.MovieItem} onClick={props.clicked}>
        {props.img === 'N/A' ? null : <MovieImage img={props.img}/>}
        <MovieContent title={props.title} year={props.year} imdbId={props.imdbId} type={props.movieType}/>
    </div>
);

export default movieItem;