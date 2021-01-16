import React from 'react';
import { data } from "./data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, showFavourite } from "./actions/index";

class App extends React.Component{

  componentDidMount(){

    // callback fun called after dispatch
    this.props.store.subscribe(()=>{
      console.log("Updated");
      console.log(this.props.store.getState());
      this.forceUpdate();
    })

    // make api call and dispatch action
    // this.props.store.dispatch({
    //   type: "ADD_MOVIES",
    //   movies: data
    // });

    this.props.store.dispatch(addMovies(data));

    
  }


  isFav = (movie)=>{
    const {favouriteList} = this.props.store.getState();
    const index = favouriteList.indexOf(movie);
    if(index===-1){
      return false;
    }
    return true;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(showFavourite(val));

  }

  render(){

    const {moviesList,favouriteList, showFav} = this.props.store.getState();
    const displayMovies = showFav? favouriteList:moviesList;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFav?"":"active-tabs"}  `} onClick={()=>this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFav?"active-tabs": ""} `} onClick={()=>this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="list">
            {displayMovies.map((movie,index) => {
              // console.log(this.isFav(movie));
              return <MovieCard
                       movie={movie}
                       dispatch={this.props.store.dispatch}
                       isFav={this.isFav(movie)}
                       key={`movie-${index}`}/>
            })}

          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No Movies to Show</div> : null}
          

        </div>
      </div>
    );
  }
}

export default App;
