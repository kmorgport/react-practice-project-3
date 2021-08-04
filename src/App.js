import React, {useState, useCallback, useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const  fetchMoviesHandler = useCallback(async ()=>{
    setIsLoading(true)
    setError(null);
    //when using async await use try catch
    try{
      const response = await fetch('https://swapi.dev/api/films/')
      const data = await response.json();
      if(!response.ok){
        throw new Error('no movies')
      }
      const transformedMovies = data.results.map(movieData=>{
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies)
    }
    catch(error){
      setError(error.message)
    }
    setIsLoading(false)
    //dont need to call any dependencies because it's not calling anything external
    }, []);

    useEffect(()=>{
      fetchMoviesHandler();
      //leaving it empty would possibly introduce bugs if the dependency relies on state
    }, [])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>There are no movies</p>}
        {isLoading && <p>Loadng...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
