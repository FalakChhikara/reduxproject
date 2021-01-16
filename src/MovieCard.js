import React from 'react';
import { addFavMovies, removeFavMovies } from "./actions/index";

class MovieCard extends React.Component{
  
  FavClick = ()=>{
    const {movie} = this.props;
    this.props.dispatch(addFavMovies(movie));
  }

  UnFavClick = ()=>{
    const {movie} = this.props;
    this.props.dispatch(removeFavMovies(movie));
  }


  render(){
      const {movie} = this.props;
      return (
        <div className="movie-card">
            <div className="left">
                <img src={movie.Poster} alt="movieImg" />
            </div>
            <div className="right">
                <div className="title">{movie.Title}</div>
                <div className="plot">{movie.Plot}</div>
                <div className="footer">
                   <div className="rating">{movie.imdbRating}</div>
                   {
                     !this.props.isFav
                     ?<button className="favourite-btn" onClick={this.FavClick}>Favourite</button>
                     :<button className="unfavourite-btn" onClick={this.UnFavClick}>UnFavourite</button>
                   }
                   
                </div>
            </div>
        </div>
      );
  }
}

export default MovieCard;
