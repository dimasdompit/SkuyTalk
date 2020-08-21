import axios from 'axios';
// import {API_URL_SECOND} from '@env';
import {config} from '../../baseUrl';

export const getChats = (token) => {
  return {
    type: 'GETCHATS',
    payload: axios({
      method: 'GET',
      url: `${config.baseUrl}/chat`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const showAllChats = (token, id) => {
  return {
    type: 'SHOW_ALL_CHATS',
    payload: axios({
      method: 'GET',
      url: `${config.baseUrl}/chat/${id}`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const postChats = (token, id, data) => {
  return {
    type: 'POST_CHATS',
    payload: axios({
      method: 'POST',
      url: `${config.baseUrl}/chat/${id}`,
      data: data,
      headers: {
        Authorization: token,
      },
    }),
  };
};

// export const getChatById = token;
