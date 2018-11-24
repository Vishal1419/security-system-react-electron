import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import sidebarReducer from '../redux/sidebar';
import usersReducer from '../redux/users';
import licensesReducer from '../redux/licenses';

const rootReducer = combineReducers({
  form: formReducer,
  sidebar: sidebarReducer,
  users: usersReducer,
  licenses: licensesReducer,
});

export default rootReducer;
