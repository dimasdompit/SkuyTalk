import axios from 'axios';
// import {API_URL} from '@env';
import {config} from '../../baseUrl';

export const getAllUsers = (token) => {
  return {
    type: 'GET_ALL_USERS',
    payload: axios({
      method: 'GET',
      url: `${config.baseUrl}/users`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const getUsersById = (token, id) => {
  return {
    type: 'GET_USERS_BY_ID',
    payload: axios({
      method: 'GET',
      url: `${config.baseUrl}/users/${id}`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const putUsers = (token, id, data) => {
  return {
    type: 'PUTUSERS',
    payload: axios({
      method: 'PUT',
      url: `${config.baseUrl}/users/${id}`,
      data: data,
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }),
  };
};
