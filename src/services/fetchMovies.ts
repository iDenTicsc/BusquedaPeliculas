import type { Movie } from "../Types/movie"
import { MapMovies } from "./MovieMapper"

type fetchMoviesProps = {
    search: string
}

const API_KEY = '91e35ad8'
const fetchMovies = async ({ search }: fetchMoviesProps) => {
    if (search === "") return []

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const Movies: Movie[] =
            json?.Response === "True"
                ? MapMovies(json?.Search ?? [])
                : []

        return Movies
    } catch (e) {
        throw new Error(`Error buscando peliculas: ${e}`);

    }
}

export default fetchMovies
