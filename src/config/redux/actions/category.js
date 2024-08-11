// actions/paramActions.js
export const GET_CATEGORY = 'GET_CATEGORY';
export const SET_CATEGORY = 'SET_CATEGORY';

export const getCategory = () => ({
    type: GET_CATEGORY
});

export const setCategory = (parameters) => ({
    type: SET_CATEGORY,
    payload: parameters
});

