import React from 'react';
import classes from './EpisodeContent.css';

const episodeContent = (props) => (
    <div className={classes.EpisodeContent}>
        <h5>{props.title}</h5>
        <div className={classes.EpisodeContentInfo}>
            <small>released: {props.released}</small>
            <small>episode: {props.episode}</small>
            <small>imdb rating: {props.imdbRating}</small>
        </div>
    </div>
);

export default episodeContent;