import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MoviesList from './components/MoviesList';
import MovieInfo from './components/MovieInfo';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([])
  const [searchBar, setSearchBar] = useState('')
  const [favourites, setFavourites] = useState([])

  const getMovierequest = async (searchBar) => {
    const url = `http://www.omdbapi.com/?s=${searchBar}&apikey=fce209d1`
    const response = await fetch(url)
    const responsejson = await response.json()
    if (responsejson.Search) {
      setMovies(responsejson.Search)
    }
  }
  useEffect(() => {
    getMovierequest(searchBar)
  }, [searchBar])
  const saveToLocalStorage=(items)=>{
    localStorage.setItem("myFavourites",JSON.stringify(items))
  }
  const AddFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }
  const RemoveFavouritesMovie=(movie)=>{
    const newFavouriteList=favourites.filter(
      (favourite)=>favourite.imdbID!==movie.imdbID
    )
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieInfo
          heading="Movies"
        />
        <SearchBox
          searchBar={searchBar}
          setSearchBar={setSearchBar}
        />
      </div>
      <div className="row">
        <MoviesList
          movies={movies}
          handleFavouritesClick={AddFavouriteMovie}
          favouriteComponent={AddFavourite}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-2'>
        <MovieInfo heading='Favourites' />
      </div>
      <div className="row">
        <MoviesList
          movies={favourites}
          handleFavouritesClick={RemoveFavouritesMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
