import axios from 'axios';
import {API_URL} from '@env';

export const putUsers = (token, id, data) => {
  return {
    type: 'PUTUSERS',
    payload: axios({
      method: 'PUT',
      url: `${API_URL}/users/${id}`,
      data: data,
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }),
  };
};
