import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])

  const fetchMoviesHandler = () =>{
    fetch('https://swapi.dev/api/films/')
    .then(response =>{
      return response.json()
    }).then(data =>{
      setMovies(data.results)
    })
  }

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
