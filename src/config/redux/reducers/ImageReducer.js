// reducers/paramReducer.js
import {
    GET_UPLOADED_IMAGE,
    SET_UPLOADED_IMAGE
} from '../actions/ImageAction';

const initialState = {
    uploadedImage: null
};

const ImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_UPLOADED_IMAGE:
            return {
                ...state,
            };
        case SET_UPLOADED_IMAGE:
            console.log("action", action)
            return {
                ...state, ...action.payload,
            };
        default:
            return state;
    }
};

export default ImageReducer;
