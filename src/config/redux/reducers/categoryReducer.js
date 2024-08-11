// reducers/paramReducer.js
import {
    GET_CATEGORY,
    SET_CATEGORY
} from '../actions/category';

const initialState = {
    data: []
};

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
            };
        case SET_CATEGORY:
            return {
                ...state, ...action.payload,
            };
        default:
            return state;
    }
};

export default CategoryReducer;
