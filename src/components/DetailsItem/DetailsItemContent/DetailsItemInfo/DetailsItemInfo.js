import React from 'react';
import classes from './DetailsItemInfo.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const detailsItemInfo = (props) => {

    let seasons = [];

    if (props.Type === 'series') {
        for (let i = 1; i <= +props.totalSeasons; i++) {
            seasons.push(<a key={i} onClick={() => props.episodeClicked(i)}>{i}</a>)
        }
    }

    return (
        <Aux>
            <div className={classes.DetailsItemInfo}>
                {props.Plot !== 'N/A' ? <p><b>Summary: </b>{props.Plot}</p> : null}
                {props.Director !== 'N/A' ? <p><b>Director: </b>{props.Director}</p> : null}
                {props.Writer !== 'N/A' ? <p><b>Writer: </b>{props.Writer}</p> : null}
                {props.Actors !== 'N/A' ? <p><b>Actors: </b>{props.Actors}</p> : null}
                {props.Production !== 'N/A' ? <p><b>Production: </b>{props.Production}</p> : null}
                {props.Website !== 'N/A' ? <p><b>Official site: </b><a href={props.Website}>Go!</a></p> : null}
                {props.imdbID !== 'N/A' ? <small><b>Imdb link: </b>
                    <a href={`https://www.imdb.com/title/${props.imdbID}/?ref_=nv_sr_1`}>Go!</a>
                </small> : null}
                {props.Type === 'series' ? <small><b>Seasons: </b>{seasons}</small> : null}
                <div className={classes.Votes}>
                    {props.Metascore !== 'N/A' ? <div className={classes.Metascore}><b>{props.Metascore}</b></div> : null}
                    {props.imdbRating !== 'N/A' ?
                        <div className={classes.ImdbVotes}>
                            <h3>{props.imdbRating}</h3>
                            <small> / 10 </small>
                            {props.imdbVotes !== 'N/A' ? <small style={{marginLeft: '5px'}}> Votes: {props.imdbVotes}</small> : null}
                        </div> : null}
                </div>
                {props.Awards !== 'N/A' ? <div className={classes.Awards}><b>{props.Awards} </b></div> : null}
            </div>
        </Aux>
    )
};

export default detailsItemInfo;