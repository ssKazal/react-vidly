import axios from 'axios';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/token/refresh/';

let access_token = localStorage.getItem('access_token');
let refresh_token = localStorage.getItem('refresh_token');
if (access_token) {
  const decodedToken = jwt_decode(access_token, { complete: true });
  const dateNow = new Date();
  if (decodedToken['exp'] < dateNow.getTime()) {
    axios.post(apiEndPoint, { refresh: refresh_token }).then(function (response) {
      access_token = response.data['access'];
    });
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    console.log('Logging the error', error);
    toast.error('An unexpected error occurred!');
  }
  return Promise.reject(error);
});

const httpRequest = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpRequest;
