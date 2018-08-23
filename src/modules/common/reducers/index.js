import { combineReducers } from 'redux';
import errorReducer from './errorReducers';

import userReducer from '../../user/reducers/userReducer';
import courseReducer from '../../guess/reducers/courseReducer';

export default combineReducers({
  user: userReducer,
  errors: errorReducer,
  course: courseReducer,
});
