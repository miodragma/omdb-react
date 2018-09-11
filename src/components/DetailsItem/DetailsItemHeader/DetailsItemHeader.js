import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../containers/Details/store/actions/index';
import * as episodesActionCreators from '../../../containers/Episodes/store/actions/index';
import classes from './DetailsItemHeader.css';

class DetailsItemHeader extends Component {

    onAddToStatsHandler = () => {
      this.props['Type'] === 'episode' ? this.props.onAddEpisodeToStats() : this.props.onAddToStats()
    };

    render() {
        const checkStats = (arr) => arr.some((item) => item.imdbID === this.props.imdbID) ?
            {pointerEvents: 'none', color: 'red'} : {pointerEvents: 'auto'};
        const style = this.props['Type'] === 'episode' ? checkStats(this.props.getEpisodeStats) : checkStats(this.props.getStats);
        return (
            <div className={classes.DetailsItemHeader}>
                <i style={style} className={[classes.AddToState, "fas fa-thumbtack"].join(' ')} onClick={this.onAddToStatsHandler}></i>
                <h3>{this.props.Title}
                    <small> ( {this.props.Year} )</small>
                </h3>
                <small>
                    {this.props.Rated} | {this.props.Runtime} | {this.props.Genre} | {this.props.Language} | {this.props.Released} | {this.props.Country}
                </small>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        getStats: state.details.stats,
        getEpisodeStats: state.episodes.episodeStats
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToStats: () => dispatch(actionCreators.addToStats()),
        onAddEpisodeToStats: () => dispatch(episodesActionCreators.addEpisodeToStats())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsItemHeader);