import { MapMovies } from "../services/MovieMapper"
import type { ApiResponse, Movie } from "../Types/movie"
import responseMovies from '../Mocks/with-results.json'

export function useMovies() {
  const Data = responseMovies as ApiResponse
  const Movies: Movie[] = MapMovies(Data.Search ?? [])

  return { Movies }
}