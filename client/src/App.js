import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import axios from 'axios';
import MovieForm from './Movies/MovieForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/'>
        <MovieList movies={movieList} />
      </Route>

      <Route path='/movies/:id'>
        <Movie addToSavedList={addToSavedList} />
      </Route>

      {/* I'll be starting with the edit functionality

        STEP 1 => Create a route that points to your form ⬇️
      */}

      {/* STEP 1 - I => "idFromUrl" is the dynamic data that will be populated with id of the movie we are updating */}
      <Route path='/update-movies/:idFromUrl'>
        {/* STEP 1 - II => pass "movieList" and "setMovieList" as props to MovieForm component */}
        <MovieForm movieList={movieList} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
