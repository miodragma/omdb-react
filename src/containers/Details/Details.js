import React, { Component } from 'react';
import classes from './Details.css';
import DetailsItem from '../../components/DetailsItem/DetailsItem';

import { connect } from 'react-redux';

import * as actionCreators from './store/actions/index';
import * as episodesActionCreators from '../Episodes/store/actions/index';

class Details extends Component {

    componentDidMount() {
        if (this.props.match.params.id) {
            if (!this.props.details.movieDetails['Response'] ||
                (this.props.details.movieDetails['Response'] && this.props.details.movieDetails['imdbID'] !== this.props.match.params.id)) {
                this.props.onResetEpisode();
                this.props.onResetEpisodes();
                this.props.onResetDetails();
                this.props.onGetDetails(this.props.match.params.id);
            }
        }
    }

    render() {

        let detailsItem = <p>Loading...</p>;

        if (this.props.details.movieDetails['Response'] === 'True') {
            detailsItem = <DetailsItem {...this.props.details.movieDetails}/>
        }

        return (
            <div className={classes.Details}>
                {detailsItem}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        details: state.details,
        episodes: state.episodes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetDetails: (imdbId) => dispatch(actionCreators.getDetails(imdbId)),
        onResetDetails: () => dispatch(actionCreators.resetDetails()),
        onResetEpisode: () => dispatch(episodesActionCreators.resetEpisode()),
        onResetEpisodes: () => dispatch(episodesActionCreators.resetEpisodes())

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);