import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error

    // You can even test for a response code
    // and try a new request before rejecting the promise
    if (error.response.status === 401) {
      const requestConfig = error.config;

      if (error.response.data.message === 'Invalid JWT token') {
        localStorage.removeItem('@TM:token');
        localStorage.removeItem('@TM:user');
      }
      return axios(requestConfig);
    }
    return Promise.reject(error);
  },
);

export default api;
