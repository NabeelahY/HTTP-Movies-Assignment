import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

export default function MovieForm({ setMovieList, movieList }) {
  let history = useHistory();

  //  STEP 3 - I: In order to pre populate the form with the movie detials that corresponds with with the "idFromUrl"
  let { idFromUrl } = useParams();
  //  STEP 3 - II: We use the ".find" array method and get the movie tha has the same id as the one we got from the url (idFromUrl)
  //  STEP 3 - III: Make sure to convert it to a number (using the "Number" method) because the "idFromUrl" is a string
  const currentMovie = movieList.find(movie => movie.id === Number(idFromUrl));
  console.log('update', currentMovie);

  //   STEP 3: Create a slice of state to store the form values.
  //   Make sure to read the API documentation or check the server file to know what is expected to send in the put request
  const [data, setData] = useState({
    id: Number(idFromUrl),
    title: currentMovie.title,
    director: currentMovie.director,
    metascore: currentMovie.metascore,
    stars: currentMovie.stars
  });

  //   STEP 4: Create an input change handler function to store the values from each input in the form
  const onChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  // STEP 5: Create a submit handler function. This will handle the put request
  const onSubmit = (event, id) => {
    debugger;
    event.preventDefault();
    // STEP 5 - I: The put request accepts an id that corresponds to the id gotten from the url
    axios
      .put(`http://localhost:5000/api/movies/${id}`, data)
      .then(response => {
        // STEP 5 - II: When the put is succesful, we want to update the movieList with the updated movie with the "setter function" we passed as props
        setMovieList(list => {
          return list.map(movie => {
            if (movie.id === Number(id)) {
              return response.data;
            }
            return movie;
          });
        });
        // STEP 5 - II: Then push back to the home page to see updated movie
        history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // STEP 2: Create a form with the fields you want to update
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e, idFromUrl)}>
        {/* FINAL STEP: use the submit handler function on the form and pass in the "urlFromUrl" 
            Do not do the same mistake I made 😭
        */}
        <label>Title:</label>
        {/* STEP 2- I: Make sure to include these attributes in the input fields. 
            Ensure that each name attribute tallies to
            each slice of state
        */}
        <input
          placeholder='Title:'
          name='title'
          onChange={event => onChange(event)}
          value={data.title}
        />

        <label>Director:</label>
        <input
          placeholder='Director:'
          name='director'
          onChange={event => onChange(event)}
          value={data.director}
        />

        <label>Metascore:</label>
        <input
          placeholder='Metascore:'
          name='metascore'
          onChange={event => onChange(event)}
          value={data.metascore}
        />
        <button>Edit!</button>
      </form>
    </div>
  );
}
