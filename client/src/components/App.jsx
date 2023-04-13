import React from 'react';

var movies = [
  {title: 'Mean Girls'},
  {title: 'Hackers'},
  {title: 'The Grey'},
  {title: 'Sunshine'},
  {title: 'Ex Machina'}
];

/*----------------------Movie App----------------------*/
const App = () => {
  const [movieData, setMovieData] = React.useState(movies);

  // React.useEffect(() => {
  //   searcher('', setMovieData);
  // }, []);

  return (
    <div>
      <div>
        <h2 onClick={() => window.location.reload(false)}>MovieList</h2>
      </div>
      <div>
          <AddMovie movieDataSetter={setMovieData}/>
          <Search movieDataSetter={setMovieData}/>
          <WatchedAlready movieDataSetter={setMovieData}/>
          <ToWatch/>
          <MovieList movies={movieData}/>
      </div>
    </div>
  )
};


/*----------------------Movie Watched----------------------*/
const WatchedAlready = ({movieDataSetter}) => (
  <div>
    <button onClick={alert('hi')}>Watched Already</button>
  </div>
);

var showWatched = (cb) => {
  var tags = document.getElementsByTagName("li");
  var newData = [];

  for (var j = 0; j < tags.length; j++) {
    if (tags[j].attributes.watched.value) {
      for (var n = 0; n < movies.length; n++) {
        if (movies[n].title === tags[j].innerText) {
          newData.push(movies[n]);
        }
      }
    }
  }

  if (newData.length === 0) {
    newData.push({title:'no watched movie yet :('});
  }

  cb(newData);
};


/*----------------------Movie Watched----------------------*/
const ToWatch = () => (
  <button onClick={showToWatch}>To Watch</button>
);

var showToWatch = () => {
};


/*----------------------Movie Add----------------------*/
const AddMovie = ({movieDataSetter}) => (
  <div>
    <input className='user-input' type='text' placeholder='Add movie title here'/>
    <button onClick={() => addToMovieList(movieDataSetter)}>Add</button>
  </div>
);

var addToMovieList = () => {
  var newMovie = document.getElementsByClassName('user-input')[0].value;

  if (newMovie.length !== 0) {
    movies.push({title: newMovie})
  }
};


/*----------------------Movie Search----------------------*/
const Search = ({movieDataSetter}) => {
  return (
    <div>
      <input className='search-query' type='text' placeholder='Search...' onChange={() => searcher(movieDataSetter)}/>
      <button onClick={() => searcher(movieDataSetter)}>Go!</button>
    </div>
  )
};

var searcher = (cb) => {
  var query = (document.getElementsByClassName('search-query')[0].value).toLowerCase();
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


/*----------------------Movie List----------------------*/
const MovieList = ({movies}) => (
  <div>
    <ul>
      {movies.map((movie, index) => (
        <MovieListEntry key={index} movie={movie}/>
      ))}
    </ul>
  </div>
);

const MovieListEntry = ({movie}) => {
  const [isWatched, setIsWatched] = React.useState(false);
  const style = {
    color: isWatched ? '#00FF00' : '#FF0000'
  }

  return (
    <div>
      <li watched={'' + isWatched}>{movie.title}</li>
      <div>
        <button style={style} onClick={() => {setIsWatched(!isWatched)}}>Watched</button>
      </div>
    </div>
  )
};

export default App;