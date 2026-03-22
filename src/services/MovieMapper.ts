import type { ApiMovie, Movie } from "../Types/movie";

export const MapMovies = (movies: ApiMovie[]): Movie[] => {
  return movies.map(m => ({
    id: m.imdbID,
    title: m.Title,
    year: m.Year,
    poster: m.Poster
  }));
};