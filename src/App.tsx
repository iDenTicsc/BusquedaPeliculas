import './App.css'
import MovieNoResults from './components/MovieNoResults'
import MovieResults from './components/MovieResults'
import { useMovies } from './hooks/useMovies'
import React, { type ChangeEvent, type SubmitEvent } from 'react'
import { useSearch } from './hooks/useSearch'
//import withoutResults from './Mocks/without-results.json'


function App() {
  const { Movies } = useMovies()
  const { search, setSearch, error } = useSearch();
  const HasMovies = Movies.length > 0

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (search === "") return

    console.log({ search })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const NewQuery = event.target.value
    if (NewQuery.startsWith(' ')) return
    setSearch(event.target.value)
  }



  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} placeholder='Avengers, Titanic, Pulp Fiction...' />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          HasMovies
            ?
            (
              <MovieResults movies={Movies} />
            )
            :
            (
              <MovieNoResults />
            )
        }
      </main>
    </div >
  )
}

export default App
