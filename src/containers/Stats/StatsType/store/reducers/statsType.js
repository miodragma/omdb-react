import * as actionTypes from '../actions/actionTypes';

const initialState = {
    colors: []
};

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COLORS:
            return {
                ...state,
                colors: !(state.colors.some(item => item.title === action.payload.title)) ?
                    state.colors.concat(action.payload) : [...state.colors]
            };
        default:
            return state;
    }
};

export default statsReducer;