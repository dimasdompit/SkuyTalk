import axios from 'axios';
// import {API_URL_SECOND} from '@env';
import {config} from '../../baseUrl';

export const login = (data) => {
  return {
    type: 'LOGIN',
    payload: axios({
      method: 'POST',
      url: `${config.baseUrl}/auth/login`,
      data: {
        username: data.username,
        password: data.password,
      },
    }),
  };
};

export const register = (data) => {
  return {
    type: 'REGISTER',
    payload: axios({
      method: 'POST',
      url: `${config.baseUrl}/users`,
      data: {
        fullname: data.fullname,
        email: data.email,
        username: data.username,
        password: data.password,
      },
    }),
  };
};

// export const putUsers = (token, id, data) => {
//   return {
//     type: 'PUTUSERS',
//     payload: axios({
//       method: 'PUT',
//       url: `${API_URL}/users/${id}`,
//       data: data,
//       headers: {
//         Authorization: token,
//         Accept: 'application/json',
//         'Content-Type': 'multipart/form-data',
//       },
//     }),
//   };
// };

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
