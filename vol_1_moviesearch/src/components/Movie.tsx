import React from 'react'
import { MovieModel } from '../models/MovieModel'

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'

type hasMovie = {
  movie: MovieModel
}

interface MovieProps extends hasMovie {}

const MovieComponent: React.FC<MovieProps> = props => {
  const movie = props.movie
  const poster =
    movie.poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.poster
  return (
    <div className="movie">
      <h2>{movie.title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.title}`}
          src={poster}
        />
      </div>
      <p>({movie.year})</p>
    </div>
  )
}

export default MovieComponent
