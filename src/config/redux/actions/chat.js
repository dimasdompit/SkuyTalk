import axios from 'axios';
import {API_URL} from '@env';

export const getAllChats = (token) => {
  return {
    type: 'GETALLCHATS',
    payload: axios({
      method: 'GET',
      url: `${API_URL}/chat`,
      headers: {
        Authorization: token,
      },
    }),
  };
};
