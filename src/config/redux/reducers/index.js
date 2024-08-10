import { combineReducers } from 'redux';
import ImageReducer from './ImageReducer';

const rootReducer = combineReducers({
    imageReducer: ImageReducer
});

export default rootReducer;
