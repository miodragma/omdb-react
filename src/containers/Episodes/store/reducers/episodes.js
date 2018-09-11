import * as actionTypes from '../actions/actionTypes';

const initialState = {
    episodes: {},
    seasonId: null,
    episode: {},
    episodeStats: []
};

const episodesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_EPISODES:
            return {
                ...state,
                episodes: action.payload.data,
                seasonId: action.payload.seasonId
            };
        case actionTypes.RESET_EPISODES:
            return {
                ...state,
                episodes: {},
                seasonId: null
            };
        case actionTypes.GET_EPISODE:
            return {
                ...state,
                episode: action.payload
            };
        case actionTypes.RESET_EPISODE:
            return {
                ...state,
                episode: {}
            };
        case actionTypes.ADD_EPISODE_TO_STATS:
            return {
                ...state,
                episodeStats: state.episodeStats.concat(state.episode)
            };
        default:
            return state;
    }
};

export default episodesReducer;