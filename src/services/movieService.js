import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_API_BASE_URL + "movies/";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + movieId);
}

export function saveMovie(movie) {
  return http.post(apiEndpoint, movie);
}

export function updateMovie(movie) {
  return http.put(apiEndpoint + movie._id, movie);
}
