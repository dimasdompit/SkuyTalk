import axios from 'axios';
// import {API_URL} from '@env';
import {config} from '../../baseUrl';

export const getAllContact = (token) => {
  return {
    type: 'GETALLCONTACT',
    payload: axios({
      method: 'GET',
      url: `${config.baseUrl}/contacts`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const searchContact = (token, q) => {
  return {
    type: 'SEARCH_CONTACT',
    payload: axios({
      method: 'GET',
      url: `${config.baseUrl}/contacts/search`,
      params: {
        q: q,
      },
      headers: {
        Authorization: token,
      },
    }),
  };
};
