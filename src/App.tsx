
import './App.css'

function App() {

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form">
          Put your movie name
          <input placeholder='Avengers, Titanic, Pulp Fiction...' />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main>
        Aqui van las Pelis
      </main>
    </div>
  )
}

export default App
