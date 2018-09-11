import React, { Component } from 'react';
import classes from './Episodes.css';
import { connect } from 'react-redux';

import EpisodeList from '../../components/EpisodesList/EpisodesList';
import * as actionCreators from './store/actions/index';

class Episodes extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.fetchData(nextProps.id)
        }
    }

    componentDidMount() {
        if (!this.props.onGetEpisodes.episodes['Episodes'] ||
            (this.props.onGetEpisodes.episodes['Episodes'] &&
                this.props.id !== this.props.onGetEpisodes.seasonId)) {
            this.fetchData(this.props.id);
        }
    }

    fetchData(id) {
        this.props.onResetEpisodes();
        this.props.onResetEpisode();
        this.props.onFetchEpisodes(this.props.imdbId, id)
    }

    render() {
        let episode = <p>Loading...</p>;
        if (this.props.onGetEpisodes.episodes['Response']) {
            episode = <EpisodeList season={this.props.id} episodes={this.props.onGetEpisodes.episodes['Episodes']}/>
        }

        return (
            <div className={classes}>
                {episode}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        onGetEpisodes: state.episodes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchEpisodes: (imdbId, seasonId) => dispatch(actionCreators.getEpisodes(imdbId, seasonId)),
        onResetEpisodes: () => dispatch(actionCreators.resetEpisodes()),
        onResetEpisode: () => dispatch(actionCreators.resetEpisode())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);