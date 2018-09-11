import React from 'react';
import classes from './Movies.css';
import MovieItem from './MovieItem/MovieItem';

const movies = (props) => {
    return (
        <div className={classes.Movies}>
            {
                props.movies.map((movie, index) => {
                    return <MovieItem
                        key={index + movie.Title}
                        img={movie.Poster}
                        year={movie.Year}
                        imdbId={movie.imdbID}
                        title={movie.Title}
                        movieType={movie.Type}
                        clicked={() => props.movieClicked(index, movie.imdbID)}/>
                })
            }
        </div>
    )
};

export default movies;