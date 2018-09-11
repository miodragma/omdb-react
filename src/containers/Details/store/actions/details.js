import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchDetails = data => {
    return {
        type: actionTypes.GET_DETAILS,
        payload: data
    }
};

export const getDetails = imdbId => {
    return dispatch => {
        axios.get(`https://www.omdbapi.com/?apikey=8ed6e6d5&i=${imdbId}`)
            .then(response => {
                if (response.data) {
                    dispatch(fetchDetails(response.data))
                }
            }).catch(error => console.log(error))
    };
};

export const resetDetails = () => {
    return {
        type: actionTypes.RESET_DETAILS
    }
};

export const addToStats = () => {
    return {
        type: actionTypes.ADD_TO_STATS
    }
};

export const getSeasonId = id => {
    return {
        type: actionTypes.GET_SEASON_ID,
        payload: id
    }
};