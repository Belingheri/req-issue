import httpService from "./httpService";

const url = `${process.env.REACT_APP_ENDPOINT}/movies`;

export function getMovies() {
  return httpService.get(url);
}

export function getMovie(id) {
  return httpService.get(`${url}/${id}`);
}

export function deleteMovie(id) {
  return httpService.delete(`${url}/${id}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(`${url}/${movie._id}`, body);
  }

  return httpService.post(url, movie);
}
