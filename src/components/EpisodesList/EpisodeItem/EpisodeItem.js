import React from 'react';
import classes from './EpisodeItem.css';
import EpisodeContent from './EpisodeContent/EpisodeContent';

const episodeItem = (props) => (
    <div className={classes.EpisodesItem} onClick={props.clicked} style={props.style}>
        <EpisodeContent title={props.title} released={props.released} episode={props.episode}
                        imdbRating={props.imdbRating}/>
    </div>
);

export default episodeItem;