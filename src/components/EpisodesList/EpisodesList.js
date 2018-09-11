import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../containers/Episodes/store/actions/index';
import classes from './EpisodesList.css';

import EpisodeItem from './EpisodeItem/EpisodeItem'

import DetailsItem from '../DetailsItem/DetailsItem';

class EpisodesList extends Component {

    state = {
        id: null
    };

    onEpisodeHandler = (episode) => {
        this.setState({id: episode['imdbID']});
        if (this.props.onGetEpisode.episode['imdbID'] !== episode['imdbID']) {
            this.props.onResetEpisode();
            this.props.onFetchEpisode(episode['imdbID'])
        }
    };

    render() {

        const style = {
            backgroundColor: '#000000',
            color: '#ececec',
            transition: 'all 0.3s ease-out'
        };
        return (
            <div>
                <h3 style={{textAlign: 'center', color: '#ececec'}}>Season: {this.props.season}</h3>
                {this.props.episodes.map((episode, index) => {
                return <div className={classes.EpisodesList} key={episode + index}>
                <EpisodeItem
                style={this.props.onGetEpisode.episode['imdbID'] === episode.imdbID ||
                    episode.imdbID === this.state.id ? style : null}
                clicked={() => this.onEpisodeHandler(episode)}
                title={episode.Title}
                released={episode.Released}
                episode={episode.Episode}
                imdbRating={episode.imdbRating}
                imdbId={episode.imdbID}
                />
                {this.props.onGetEpisode.episode['imdbID'] === episode.imdbID ? <DetailsItem {...this.props.onGetEpisode.episode}/> : null}
                </div>
            })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        onGetEpisode: state.episodes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchEpisode: (imdbId) => dispatch(actionCreators.getEpisode(imdbId)),
        onResetEpisode: () => dispatch(actionCreators.resetEpisode())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodesList);