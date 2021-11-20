import httpRequest from './HttpService';
import { apiUrl } from '../config.json';

export function getGenres() {
  return httpRequest.get(apiUrl + '/genres/');
}
