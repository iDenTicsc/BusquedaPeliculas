import './App.css'
import MovieNoResults from './components/MovieNoResults'
import MovieResults from './components/MovieResults'
import { useMovies } from './hooks/useMovies'
import { useCallback, useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const HasMovies = movies.length > 0

  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      console.log('search', search)
      getMovies(search)
    }, 500), [getMovies]
  ) 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const NewQuery = event.target.value
    if (NewQuery.startsWith(' ')) return
    setSearch(event.target.value)
    debouncedGetMovies(NewQuery)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (search === "") return
    if (error !== "") return

    getMovies(search)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  useEffect(() => {
    console.log("Render movie recived")
  }, [getMovies])


  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} placeholder='Avengers, Titanic, Pulp Fiction...' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading ?
            <p>Cargando</p> :
            HasMovies ? (<MovieResults movies={movies} />) : (<MovieNoResults />)
        }
      </main>
    </div >
  )
}

export default App
