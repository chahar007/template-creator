import { combineReducers } from 'redux';
import CategoryReducer from './categoryReducer';
import ImageReducer from './ImageReducer';

const rootReducer = combineReducers({
    imageReducer: ImageReducer,
    categoryReducer: CategoryReducer
});

export default rootReducer;
