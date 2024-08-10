// actions/paramActions.js
export const GET_UPLOADED_IMAGE = 'GET_UPLOADED_IMAGE';
export const SET_UPLOADED_IMAGE = 'SET_UPLOADED_IMAGE';

export const getUploadedImage = () => ({
    type: GET_UPLOADED_IMAGE
});

export const setUploadedImage = (parameters) => ({
    type: SET_UPLOADED_IMAGE,
    payload: parameters
});

