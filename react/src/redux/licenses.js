import RequestStates from '../constants/request-states';
import createAsyncAction from '../utils/async-redux';
import { getLicenses, generateLicenses } from '../clients/security';

export const types = {
  GET_LICENSES_LOADING: 'licenses::get::loading',
  GET_LICENSES_SUCCESS: 'licenses::get::success',
  GET_LICENSES_FAILURE: 'licenses::get::failure',
  GENERATE_LICENSES_LOADING: 'licenses::generate::loading',
  GENERATE_LICENSES_SUCCESS: 'licenses::generate::success',
  GENERATE_LICENSES_FAILURE: 'licenses::generate::failure',
};

const INITIAL_STATE = {
  licenses: [],
  requestState: RequestStates.init,
  getLicensesError: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_LICENSES_LOADING:
      return {
        ...state,
        licenses: [],
        requestState: RequestStates.loading,
        getLicensesError: '',
      };
    case types.GET_LICENSES_SUCCESS:
      return {
        ...state,
        licenses: action.payload.licenses,
        requestState: RequestStates.success,
        getLicensesError: '',
      };
    case types.GET_LICENSES_FAILURE:
      return {
        ...state,
        requestState: RequestStates.failure,
        getLicensesError: action.payload,
      };
    case types.GENERATE_LICENSES_LOADING:
      return {
        ...state,
        requestState: RequestStates.loading,
        generateLicensesError: '',
      };
    case types.GENERATE_LICENSES_SUCCESS:
      return {
        ...state,
        requestState: RequestStates.success,
        generateLicensesError: '',
      };
    case types.GENERATE_LICENSES_FAILURE:
      return {
        ...state,
        requestState: RequestStates.failure,
        generateLicensesError: action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  getLicenses: type => createAsyncAction({
    asyncRequest: getLicenses.bind(null, type),
    types: {
      loading: types.GET_LICENSES_LOADING,
      success: types.GET_LICENSES_SUCCESS,
      failure: types.GET_LICENSES_FAILURE,
    },
  }),
  generateLicenses: () => createAsyncAction({
    asyncRequest: generateLicenses.bind(null),
    types: {
      loading: types.GENERATE_LICENSES_LOADING,
      success: types.GENERATE_LICENSES_SUCCESS,
      failure: types.GENERATE_LICENSES_FAILURE,
    },
  }),
};
