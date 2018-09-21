import React, { Component } from 'react';
import classes from './Home.css';
import { FormGroup, Radio } from 'react-bootstrap';

import Input from '../../components/UI/Input/Input';
import Movies from '../../components/Movie/Movies/Movies';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

class Home extends Component {

    state = {
        checked: 'all'
    };

    componentDidMount() {
        if (this.state.checked !== this.props.movies.type) {
            this.setState({checked: this.props.movies.type})
        }
        const query = new URLSearchParams(this.props.location.search);
        let title = '';
        let page = null;
        for (let param of query.entries()) {
            param[0] === 't' ? title = param[1] : '';
            param[0] === 'p' ? page = param[1] : null;
        }
        if (this.props.movies.title !== title || +this.props.movies.page !== +page) {
            this.props.onAddTitle(title);
            this.props.onAddPage(page);
            this.props.onGetData(title, page, this.state.checked);
        }
    }

    onChangeHandler = (event) => {
        if (event.target.value === event.target.value.trim()) {
            this.getMovieData(event.target.value, 1);
        }
    };

    getMovieData = (title, page) => {
        this.props.onAddTitle(title);
        this.props.onAddPage(page);
        this.props.onGetData(title, page, this.state.checked);
        this.props.history.push({pathname: '/', search: `?t=${title}&p=${page}`})
    };

    onClickedMovieHandler = (id, imdbId) => {
        this.props.history.push({pathname: `/details/${imdbId}`});
    };


    onPrevDataHandler = () => {
        const page = +this.props.movies.page - 1;
        this.getMovieData(this.props.movies.title, page)
    };

    onNextDataHandler = () => {
        const page = +this.props.movies.page + 1;
        this.getMovieData(this.props.movies.title, page)
    };

    onChangeTypeHandler = (event) => {
        const checkedName = event.target.name.toLowerCase();
        if (this.state.checked !== checkedName) {
            this.props.onGetData(this.props.movies.title, this.props.movies.page, checkedName);
        }
        this.setState({checked: checkedName});
    };

    render() {
        let movies = null;
        if (this.props.movies.data['Search'] !== undefined) {
            movies =
                <Movies movies={this.props.movies.data['Search']}
                        movieClicked={(id, imdbId) => this.onClickedMovieHandler(id, imdbId)}/>
        }

        const style = {
            cursor: 'default',
            color: 'red',
            opacity: '0.3',
            pointerEvents: 'none'
        };

        return (
            <div>
                <i style={this.props.movies.left ? style : null}
                   className={[classes.LeftButton, 'fas fa-chevron-left fa-3x'].join(' ')}
                   onClick={this.onPrevDataHandler}/>
                <i style={this.props.movies.right ? style : null}
                   className={[classes.RightButton, 'fas fa-chevron-right fa-3x'].join(' ')}
                   onClick={this.onNextDataHandler}/>
                <div className={classes.InputForm}>
                    <Input title={this.props.movies.title} changed={this.onChangeHandler}/>
                    <div className={classes.FormGroup}>
                        <FormGroup>
                            <Radio
                                style={{color: '#fff'}}
                                onChange={(event) => this.onChangeTypeHandler(event)}
                                name="movie"
                                inline
                                checked={this.state.checked === 'movie'}>
                                Movie
                            </Radio>{' '}
                            <Radio
                                style={{color: '#fff'}}
                                onChange={(event) => this.onChangeTypeHandler(event)}
                                name="series"
                                inline
                                checked={this.state.checked === 'series'}>
                                Series
                            </Radio>{' '}
                            <Radio
                                style={{color: '#fff'}}
                                onChange={(event) => this.onChangeTypeHandler(event)}
                                name="all"
                                inline
                                checked={this.state.checked === 'all'}>
                                All
                            </Radio>
                        </FormGroup>
                    </div>
                </div>
                <p style={{margin: '16px', color: '#fff'}}>Page: {this.props.movies.pages ? (this.props.movies.page + ' / ' + this.props.movies.pages) : null}</p>
                {movies}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetData: (title, page, type) => dispatch(actionCreators.getMovies(title, page, type)),
        onAddTitle: (title) => dispatch(actionCreators.addTitle(title)),
        onAddPage: (page) => dispatch(actionCreators.addPage(page))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);