import * as actionTypes from '../actions/actionTypes';

const initialState = {
    movieDetails: {},
    stats: [],
    seasonId: null
};

const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAILS:
            return {
                ...state,
                movieDetails: action.payload
            };
        case actionTypes.RESET_DETAILS:
            return {
                ...state,
                movieDetails: {},
                seasonId: null
            };
        case actionTypes.ADD_TO_STATS:
            return {
                ...state,
                stats: state.stats.concat(state.movieDetails)
            };
        case actionTypes.GET_SEASON_ID:
            return {
                ...state,
                seasonId: action.payload
            };
        default:
            return state;
    }
};

export default detailsReducer;