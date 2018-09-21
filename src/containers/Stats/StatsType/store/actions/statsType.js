import * as actionTypes from './actionTypes';

export const addColors = (color) => {
    return {
        type: actionTypes.ADD_COLORS,
        payload: color
    };
};