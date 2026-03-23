import type { Movie } from "../Types/movie"
import { useEffect, useRef, useState, useMemo } from "react"
import fetchMovies from "../services/fetchMovies"

type useMoviesProps = {
  search: string,
  sort: boolean
}

export function useMovies({ search, sort }: useMoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  const getMovies = useMemo(() => {
    return async (search: string) => { //Pasamos search por parametro para que no hayan dependencias que re-rendericen el metodo cada vez que cambia search
      if (search === previousSearch.current) return
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search

        await delay(500)

        if (search != "") {
          const newMovies = await fetchMovies({ search })
          setMovies(newMovies)
          localStorage.setItem("LastMovieList", JSON.stringify(newMovies)) //Guardo en cache la lista de pelis
        } else {
          setMovies([])
        }

      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError("Ocurrió un error desconocido")
        }
      } finally {
        setLoading(false)
      }
    }
  }, []) //Podemos renderizar solo una vez

  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [sort, movies]) //Solo calculalo si cambia el estado de sort o de las pelis

  //En el primer render tomo la lista de peliculas en cache y pinto
  useEffect(() => {
    const savedMovieList = localStorage.getItem("LastMovieList")
    if (savedMovieList) {
      setMovies(JSON.parse(savedMovieList))
    }
  }, [])

  return { movies: sortedMovies, getMovies, loading, error }
}