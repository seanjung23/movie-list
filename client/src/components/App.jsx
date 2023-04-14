import React from 'react';

var movies = [
  {title: 'Mean Girls', watched: false},
  {title: 'Hackers', watched: false},
  {title: 'The Grey', watched: false},
  {title: 'Sunshine', watched: false},
  {title: 'Ex Machina', watched: false}
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
          <ToWatch movieDataSetter={setMovieData}/>
          <MovieList movieList={movieData}/>
      </div>
    </div>
  )
};


/*----------------------Movies Watched----------------------*/
const WatchedAlready = ({movieDataSetter}) => {
  var showWatched = () => {
    var newData = [];

    for (var j = 0; j < movies.length; j++) {
      if (movies[j].watched) {
        newData.push(movies[j]);
      }
    }

    if (newData.length === 0) {
      newData.push({title:'no watched movie yet :('});
    }

    movieDataSetter(newData);
  };

  return (
    <div>
      <button onClick={() => showWatched()}>Watched Already</button>
    </div>
  );
};


/*----------------------Movies To Watch----------------------*/
const ToWatch = ({movieDataSetter}) => {
  var showToWatch = () => {
    var newData = [];

    for (var j = 0; j < movies.length; j++) {
      if (!movies[j].watched) {
        newData.push(movies[j]);
      }
    }

    if (newData.length === 0) {
      newData.push({title:'no movie to watch yet :('});
    }
    console.log(newData);

    movieDataSetter(newData);
  };

  return (
    <div>
      <button onClick={() => showToWatch()}>To Watch</button>
    </div>
  );
};


/*----------------------Add Movie----------------------*/
const AddMovie = ({movieDataSetter}) => {
  var addToMovieList = () => {
    var newMovie = document.getElementsByClassName('user-input')[0].value;

    if (newMovie.length !== 0) {
      movies.push({title: newMovie, watched: false});
    }

    movieDataSetter(movies);
  };

  return (
    <div>
      <input className='user-input' type='text' placeholder='Add movie title here'/>
      <button onClick={() => addToMovieList()}>Add Movie</button>
    </div>
  );
};


/*----------------------Search Movie----------------------*/
const Search = ({movieDataSetter}) => {
  var searcher = () => {
    var query = (document.getElementsByClassName('search-query')[0].value).toLowerCase();
    var newData = [];

    for (var i = 0; i < movies.length; i++) {
      if (movies[i].title.toLowerCase().indexOf(query) !== -1) {
        newData.push(movies[i]);
      }
    }
    if (newData.length === 0) {
      newData.push({title:'no movie by that name found :\'('});
    }

    movieDataSetter(newData);
  };

  return (
    <div>
      <input className='search-query' type='text' placeholder='Search...' onChange={() => searcher(movieDataSetter)}/>
      <button onClick={() => searcher(movieDataSetter)}>Go!</button>
      <div>
        <button onClick={() => searcher(movieDataSetter)}>My List</button>
      </div>
    </div>
  )
};


/*----------------------Movie List----------------------*/
const MovieList = ({movieList}) => (
  <div>
    <ul>
      {movieList.map((movie, index) => (
        <MovieListEntry key={index} movie={movie}/>
      ))}
    </ul>
  </div>
);

const MovieListEntry = ({movie}) => {
  const [isWatched, setIsWatched] = React.useState(movie.watched);
  const [isShown, setIsShown] = React.useState(false);

  const style = {
    color: movie.watched/*isWatched*/ ? '#00FF00' : '#FF0000'
  }

  var watchedSetter = () => {
    movie.watched = !isWatched;
    setIsWatched(movie.watched);
  };

  var showDetails = () => {
    setIsShown(!isShown);
  }

  return (
    <div>
      <li onClick={() => showDetails()}>{movie.title}</li>
      {isShown && (
        <div>
          <p><strong>Year:</strong></p>
          <p><strong>Runtime:</strong></p>
          <p><strong>Metascore:</strong></p>
          <p><strong>imdbRating:</strong></p>
          <button style={style} onClick={() => {watchedSetter()}}>Watched</button>
        </div>
      )}
    </div>
  )
};


export default App;