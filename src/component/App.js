import React from 'react';
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, showFavourite } from "../actions/index";
import { connect } from "../index";
// import { connect } from 'react-redux';

class App extends React.Component{

  componentDidMount(){

    // callback fun called after dispatch
    // this.props.store.subscribe(()=>{
    //   console.log("Updated");
    //   console.log(this.props.store.getState());
    //   this.forceUpdate();
    // })

    // make api call and dispatch action
    // this.props.store.dispatch({
    //   type: "ADD_MOVIES",
    //   movies: data
    // });

    this.props.dispatch(addMovies(data));

    
  }


  isFav = (movie)=>{
    const {movies} = this.props;
    const {favouriteList} = movies;
    const index = favouriteList.indexOf(movie);
    if(index===-1){
      return false;
    }
    return true;
  }

  onChangeTab = (val) => {
    this.props.dispatch(showFavourite(val));

  }

  render(){
    const {movies,search} = this.props;
    const {moviesList,favouriteList, showFav} = movies;
    const displayMovies = showFav? favouriteList:moviesList;
    console.log("App");
    // return (
    //   c
    //       {(store)=>{
    //           // return code
    //           // but in this above functions are not able to use store via this method
    //           // so make AppWrapper
    //       }}
    //   </StoreContext.Consumer>
    // )

    return (
      <div className="App">
        {/* <Navbar search={search} dispatch={this.props.store.dispatch}/> */}
        <Navbar search={search}/>
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
                       dispatch={this.props.dispatch}
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

// class AppWrapper extends React.Component{
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store)=> (<App store={store} />)}
//       </StoreContext.Consumer>
//     );
//   }
// }

// wants these properties as props from store in App component
function mapStateToProps(state){
  return {
    movies : state.movies,
    search : state.search
  }
}

const connectedAppComponent = connect(mapStateToProps)(App);

// export default App;
export default connectedAppComponent;
