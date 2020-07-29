import axios from 'axios';
import {API_URL} from '@env';

export const register = (data) => {
  return {
    type: 'REGISTER',
    payload: axios({
      method: 'POST',
      url: `${API_URL}/users`,
      data: {
        fullname: data.fullname,
        email: data.email,
        username: data.username,
        password: data.password,
      },
    }),
  };
};
