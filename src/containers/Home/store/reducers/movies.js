import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    title: '',
    page: null,
    left: true,
    right: true,
    pages: null,
    type: 'all'
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MOVIES:
            let totalResults, pages, right;
            if (action.payload.data['Search']) {
                totalResults = action.payload.data['totalResults'];
                pages = (totalResults / 10 % 1) !== 0 ? (totalResults / 10 - (totalResults / 10 % 1)) + 1 : null;
                right = action.payload.page >= pages;
            }
            return {
                ...state,
                data: action.payload.data,
                left: action.payload.page <= 1,
                right: right,
                pages: pages,
                type: action.payload.type
            };
        case actionTypes.ADD_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case actionTypes.ADD_PAGE:
            return {
                ...state,
                page: action.payload
            };
        default:
            return state;
    }
};

export default moviesReducer;