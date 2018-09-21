import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './StatsType.css';
import Chart from '../../../components/Chart/Chart';

const statsType = (props) => {

    let charts = null;

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r},${g},${b}, `;
    };

    for (let movie of props['all']) {
        props.onAddColor({
            title: movie.Title,
            color: getRandomColor()
        })
    }

    if (props['all'].length > 0) {
        const style = {
            meta: {
                background: "url('https://vignette.wikia.nocookie.net/reddeadredemption/images/0/0f/Metacritic_Logo.png/revision/latest?cb=20180321185652') no-repeat top right",
                backgroundSize: '80px 80px'
            },
            imdbR: {
                background: "url('https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg') no-repeat top right",
                backgroundSize: '80px 80px'
            },
            imdbV: {
                background: "url('https://leeseohits.com/wp-content/uploads/2017/06/imdb-300x300.png') no-repeat top right",
                backgroundSize: '80px 80px'
            },
            runtime: {
                background: "url('https://cdn1.iconfinder.com/data/icons/seo-line-optimisation-4-3/512/runtime-512.png') no-repeat top right",
                backgroundSize: '80px 80px'
            },
            boxOffice: {
                background: "url('https://www.freeiconspng.com/uploads/dollar-sign-icon-png-22.png') no-repeat top right",
                backgroundSize: '80px 80px'
            },
            rottenTom: {
                background: "url('https://www.freeiconspng.com/uploads/dollar-sign-icon-png-22.png') no-repeat top right",
                backgroundSize: '80px 80px'
            }
        };

        const boxOffice = props['all'].some(item => 'BoxOffice' in item) ?
            <div className={classes.StatsTypeItem} style={style['boxOffice']}><Chart
                title={'Box Office'}
                type={'BoxOffice'}
                max={0}
                step={0}
                from={0}
                movies={[...props['all']]}
                chartType='bar'
                toTooltip=' $'/></div> : null;

        const rottenTom = props['all'].some(item => 'Ratings' in item && item['Ratings'].length > 1) ?
            <div className={classes.StatsTypeItem} style={style['boxOffice']}><Chart
                title={'Rotten Tomatoes'}
                type={'Ratings'}
                max={100}
                step={10}
                from={0}
                movies={[...props['all']]}
                chartType='bar'
                toTooltip=' %'/></div> : null;

        charts = <Aux>
            <div className={classes.StatsTypeItem} style={style['meta']}><Chart
                title={'Metascore'}
                type={'Metascore'}
                max={100}
                step={10}
                from={100}
                movies={[...props['all']]}
                chartType='bar'
                toTooltip=' / 100'/></div>
            <div className={classes.StatsTypeItem} style={style['imdbR']}><Chart
                title={'IMDB Rating'}
                type={'imdbRating'}
                max={10}
                step={1}
                from={10}
                movies={[...props['all']]}
                chartType='bar'
                toTooltip=' / 10'/></div>
            <div className={classes.StatsTypeItem} style={style['imdbV']}><Chart
                title={'IMDB Votes'}
                type={'imdbVotes'}
                max={0}
                step={0}
                from={0}
                movies={[...props['all']]}
                chartType='bar'
                toTooltip=''/></div>
            <div className={classes.StatsTypeItem} style={style['runtime']}><Chart
                title={'Runtime'}
                type={'Runtime'}
                max={0}
                step={20}
                from={'min'}
                movies={[...props['all']]}
                chartType='horizontalBar'
                toTooltip=' min'/></div>
            {rottenTom}
            {boxOffice}
        </Aux>
    }

    return charts
};

const mapDispatchToProps = dispatch => {
    return {
        onAddColor: (colors) => dispatch(actionCreators.addColors(colors))
    }
};

export default connect(null, mapDispatchToProps)(statsType);