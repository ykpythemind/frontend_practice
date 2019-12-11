import React, { useState, useEffect, useReducer } from 'react'
import './App.css'
import Header from './Header'
import { MovieModel } from '../models/MovieModel'
import MovieComponent from './Movie'
import Search from './Search'

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b' // you should replace this with yours

type State = {
  loading: boolean
  movies: MovieModel[]
  errorMessage?: string
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
        setMovies(jsonResponse.Search)
        setLoading(false)
      })
  }, [])

  const search = (searchValue: string) => {
    setLoading(true)
    setErrorMessage(null)

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search)
          setLoading(false)
        } else {
          setErrorMessage(jsonResponse.Error)
          setLoading(false)
        }
      })
  }

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
          (movies as MovieModel[]).map((movie, index) => (
            <MovieComponent key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
