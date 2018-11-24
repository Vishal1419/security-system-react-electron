import { doRequest } from '../utils/request.js';
import { API_URL } from '../constants/config';

export const getUsers = () => doRequest(`${API_URL}/users`, 'GET');

export const getLicenses = type => {
  let query = '';
  if (type) query = `?q=${type}`;
  return doRequest(`${API_URL}/licenses${query}`, 'GET');
};

export const generateLicenses = () => doRequest(`${API_URL}/licenses`, 'POST');
