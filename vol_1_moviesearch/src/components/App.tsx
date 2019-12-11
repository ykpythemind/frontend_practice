import React, { useEffect, useReducer } from 'react'
import './App.css'
import Header from './Header'
import { MovieModel } from '../models/MovieModel'
import MovieComponent from './Movie'
import Search from './Search'

const MOVIE_API_URL = 'https://www.omdbapi.com/?apikey=983eb7a1&s=man' // you should replace this with yours

function toLowerHelper(obj: Object): Object {
  return Object.keys(obj).reduce(
    (c, k) => ((c[k.toLowerCase()] = obj[k]), c),
    {}
  )
}

type State = {
  loading: boolean
  movies: MovieModel[]
  errorMessage: string | null
}

const initialState: State = {
  loading: true,
  movies: [],
  errorMessage: null
}

type Action =
  | { type: 'SEARCH_MOVIES_REQUEST' }
  | { type: 'SEARCH_MOVIES_SUCCESS'; payload: MovieModel[] }
  | { type: 'SEARCH_MOVIES_FAILURE'; error: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default:
      return state
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse)

        const models = (jsonResponse.Search as Array<any>).map(o =>
          toLowerHelper(o)
        ) as MovieModel[]

        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: models
        })
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  const search = (searchValue: string) => {
    dispatch({ type: 'SEARCH_MOVIES_REQUEST' })

    fetch(`https://www.omdbapi.com/?apikey=983eb7a1&s=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse)
        if (jsonResponse.Response === 'True') {
          const models = (jsonResponse.Search as Array<any>).map(o =>
            toLowerHelper(o)
          ) as MovieModel[]

          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: models
          })
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error
          })
        }
      })
  }

  const { movies, errorMessage, loading } = state

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <MovieComponent key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
