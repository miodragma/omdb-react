import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import StatsType from './StatsType/StatsType';
import classes from './Stats.css';


class Stats extends Component {

    render() {

        let isDataMessage = <h1 style={{textAlign: 'center', width: '100%'}}>You have not added data to Stats</h1>;

        let moviesChart = null;

        if (this.props.moviesStats.length > 0) {
            moviesChart = <Aux>
                <h1 style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Movies Charts</h1>;
                <div className={classes.StatsItem}>
                    <StatsType all={this.props.moviesStats}/>
                </div>
            </Aux>;
            isDataMessage = null;
        }

        let episodesChart = null;

        if (this.props.seriesStats.length > 0) {
            episodesChart = <Aux>
                <h1 style={{textAlign: 'center', width: '100%', color: '#ffffff'}}>Episodes Charts</h1>;
                <div className={classes.StatsItem}>
                    <StatsType all={this.props.seriesStats}/>
                </div>
            </Aux>;
            isDataMessage = null;
        }

        return <div className={classes.StatsContainer}>
            {isDataMessage}
            {moviesChart}
            {episodesChart}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        moviesStats: state.details.stats,
        seriesStats: state.episodes.episodeStats
    }
};

export default connect(mapStateToProps)(Stats);