import React from 'react';

var movies = [];

// {title: 'Mean Girls'},
// {title: 'Hackers'},
// {title: 'The Grey'},
// {title: 'Sunshine'},
// {title: 'Ex Machina'},

const App = () => {
  const [movieData, setMovieData] = React.useState(movies);

  React.useEffect(() => {
    searcher('', setMovieData);
  }, []);

  return (
    <div>
      <div>
        <h2 onClick={() => window.location.reload(false)}>MovieList</h2>
      </div>
      <div>
        <div>
          <UserMovies movieDataSetter={setMovieData}/>
        </div>
        <div>
          <Search movieDataSetter={setMovieData} movies={movieData}/>
        </div>
        <div>
          <MovieList movies={movieData}/>
        </div>
      </div>
    </div>
  )
};

// Movie List
const MovieList = ({movies}) => (
  <div>
    <ul>
      {movies.map((movie, index) => (
        <MovieListEntry key={index} movie={movie}/>
      ))}
    </ul>
  </div>
);

const MovieListEntry = ({movie}) => (
  <li>{movie.title}</li>
);

// Movie Search
var searcher = (query, cb) => {
  var query = query || (document.getElementsByClassName('search-query')[0].value).toLowerCase();
  var newData = [];

  for (var i = 0; i < movies.length; i++) {
    if (movies[i].title.toLowerCase().indexOf(query) !== -1) {
      newData.push(movies[i]);
    }
  }
  if (newData.length === 0) {
    newData.push({title:'no movie by that name found'});
  }

  cb(newData);
};

const Search = ({movieDataSetter, movies}) => {
  return (
    <div>
      <input className='search-query' type='text' placeholder='Search...' onChange={() => {searcher(undefined, movieDataSetter)}}/>
      <button onClick={() => {searcher(undefined, movieDataSetter)}}>Go!</button>
    </div>
  )
};

// User Added Movies
var addMovie = (cb) => {
  var newMovie = document.getElementsByClassName('user-input')[0].value;
  var newData = [];

  if (newMovie.length !== 0) {
    movies.push({title: newMovie})
  }

  for (var k = 0; k < movies.length; k++) {
    newData.push(movies[k]);
  }

  cb(newData);
};

const UserMovies = ({movieDataSetter}) => (
  <div>
    <input className='user-input' type='text' placeholder='Add movie title here'/>
    <button onClick={() => {addMovie(movieDataSetter)}}>Add</button>
  </div>
);

export default App;