import axios from 'axios';
import {API_URL} from '@env';

export const getAllContact = (token) => {
  return {
    type: 'GETALLCONTACT',
    payload: axios({
      method: 'GET',
      url: `${API_URL}/contacts`,
      headers: {
        Authorization: token,
      },
    }),
  };
};
