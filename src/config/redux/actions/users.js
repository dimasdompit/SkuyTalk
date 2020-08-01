import axios from 'axios';
import {BASE_API_URL} from '@env';

export const getAllUsers = (token) => {
  return {
    type: 'GET_ALL_USERS',
    payload: axios({
      method: 'GET',
      url: `${BASE_API_URL}/users`,
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
      url: `${BASE_API_URL}/users/${id}`,
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
      url: `${BASE_API_URL}/users/${id}`,
      data: data,
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }),
  };
};
