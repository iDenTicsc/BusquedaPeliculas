
import './App.css'
import MovieNoResults from './components/MovieNoResults'
import MovieResults from './components/MovieResults'
import responseMovies from './Mocks/with-results.json'
//import withoutResults from './Mocks/without-results.json'

import type { ApiResponse, Movie } from './Types/movie'

function App() {
  const Data = responseMovies as ApiResponse
  const Movies: Movie[] = Data.Search ?? []
  const HasMovies = Movies.length > 0

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form">
          <input placeholder='Avengers, Titanic, Pulp Fiction...' />
          <button type="submit">Buscar</button>
        </form>
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
