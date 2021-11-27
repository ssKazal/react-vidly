import httpRequest from './HttpService';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/token/';

export function login(email, password) {
  return httpRequest.post(apiEndPoint, { email, password });
}
