import RequestStates from '../constants/request-states';
import createAsyncAction from '../utils/async-redux';
import { getUsers } from '../clients/security';

export const types = {
  GET_USERS_LOADING: 'users::get::loading',
  GET_USERS_SUCCESS: 'users::get::success',
  GET_USERS_FAILURE: 'users::get::failure',
};

const INITIAL_STATE = {
  users: [],
  requestState: RequestStates.init,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_USERS_LOADING:
      return {
        ...state,
        requestState: RequestStates.loading,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        requestState: RequestStates.success,
      };
    case types.GET_USERS_FAILURE:
      return {
        ...state,
        requestState: RequestStates.failure,
      };
    default:
      return state;
  }
};

export const actions = {
  getUsers: () => createAsyncAction({
    asyncRequest: getUsers.bind(null),
    types: {
      loading: types.GET_USERS_LOADING,
      success: types.GET_USERS_SUCCESS,
      failure: types.GET_USERS_FAILURE,
    }
  }),
};
