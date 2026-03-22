import type { Movie } from '../Types/movie'

type Props = {
    movies: Movie[];
}

const MovieResults = ({ movies }: Props) => {
    return (
        <>
            <ul className='movies'>
                {movies.map(movie => (
                    <li className='movie' key={movie.id}>
                        <h5>{movie.title}</h5>
                        <h5>{movie.year}</h5>
                        <img src={movie.poster} alt={movie.title} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MovieResults
