import axios from 'axios';
import {BASE_API_URL} from '@env';

export const getChats = (token) => {
  return {
    type: 'GETCHATS',
    payload: axios({
      method: 'GET',
      url: `${BASE_API_URL}/chat/private`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

export const showAllChats = (token) => {
  return {
    type: 'SHOW_ALL_CHATS',
    payload: axios({
      method: 'GET',
      url: `${BASE_API_URL}/chat`,
      headers: {
        Authorization: token,
      },
    }),
  };
};

// export const getChatById = token;
