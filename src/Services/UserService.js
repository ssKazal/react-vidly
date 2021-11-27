import httpRequest from './HttpService';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/users/';

export function register(user) {
  return httpRequest.post(apiEndPoint, {
    email: user.email,
    password: user.password,
    confirm_password: user.confirmPassword,
  });
}
