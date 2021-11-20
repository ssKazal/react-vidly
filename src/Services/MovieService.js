import httpRequest from './HttpService';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/movies/';

export function getMovies() {
  return httpRequest.get(apiEndPoint);
}

export function getMovie(movieId) {
  return httpRequest.get(apiEndPoint + movieId);
}

export function saveMovie(movie) {
  console.log(movie);
  if (movie.id) {
    const body = { title: movie.title, genre: movie.genreId, number_in_stock: movie.numberInStock, daily_rental_rate: movie.dailyRentalRate };
    return httpRequest.put(apiEndPoint + movie.id + '/', body);
  }
  const body = { title: movie.title, genre: movie.genreId, number_in_stock: movie.numberInStock, daily_rental_rate: movie.dailyRentalRate };
  return httpRequest.post(apiEndPoint, body);
}

export function deleteMovie(movieId) {
  return httpRequest.delete(apiEndPoint + movieId);
}
