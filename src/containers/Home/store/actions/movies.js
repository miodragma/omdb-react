import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchMovies = (data) => {
    return {
        type: actionTypes.GET_MOVIES,
        payload: data
    };
};


export const getMovies = (title, page, type) => {
    return dispatch => {
        axios.get(`https://www.omdbapi.com/?apikey=8ed6e6d5&s=${title}*${type === 'all' ? '' : `&type=${type}`}&page=${page}`)
            .then(response => {
                if (response.data['Search']) {
                    const data = {data: response.data, title: title, page: page, type: type};
                    dispatch(fetchMovies(data))
                }
            }).catch(error => console.log(error))
    }
};

export const addTitle = (title) => {
    return {
        type: actionTypes.ADD_TITLE,
        payload: title
    };
};

export const addPage = (page) => {
    return {
        type: actionTypes.ADD_PAGE,
        payload: page
    };
};