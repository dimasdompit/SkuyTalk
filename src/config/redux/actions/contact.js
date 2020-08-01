import axios from 'axios';
import {BASE_API_URL} from '@env';

export const getAllContact = (token) => {
  return {
    type: 'GETALLCONTACT',
    payload: axios({
      method: 'GET',
      url: `${BASE_API_URL}/contacts`,
      headers: {
        Authorization: token,
      },
    }),
  };
};
