import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchEpisodes = data => {
    return {
        type: actionTypes.GET_EPISODES,
        payload: data
    }
};

export const getEpisodes = (imdbId, seasonId) => {
    return dispatch => {
        axios.get(`http://www.omdbapi.com/?apikey=8ed6e6d5&i=${imdbId}&Season=${seasonId}`)
            .then(response => {
                if (response.data) {
                    const data = {
                        data: response.data,
                        seasonId: seasonId
                    };
                    dispatch(fetchEpisodes(data))
                }
            }).catch(error => console.log(error))
    };
};

export const resetEpisodes = () => {
    return {
        type: actionTypes.RESET_EPISODES
    }
};

export const fetchEpisode = data => {
    return {
        type: actionTypes.GET_EPISODE,
        payload: data
    }
};

export const getEpisode = imdbId => {
    return dispatch => {
        axios.get(`https://www.omdbapi.com/?apikey=8ed6e6d5&i=${imdbId}`)
            .then(response => {
                if (response.data) {
                    dispatch(fetchEpisode(response.data))
                }
            }).catch(error => console.log(error))
    }
};

export const resetEpisode = () => {
    return {
        type: actionTypes.RESET_EPISODE
    }
};

export const addEpisodeToStats = () => {
    return {
        type: actionTypes.ADD_EPISODE_TO_STATS
    }
};
