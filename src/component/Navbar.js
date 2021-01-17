import React from 'react';
import { MovieSearch,AddMovieToList } from "../actions/index";

class Navbar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handlechange = (e)=> {
    this.setState({
      searchText: e.target.value,
    })
  }

  searchClick = ()=>{
    const {searchText} = this.state;
    this.props.dispatch(MovieSearch(searchText));
  }

  AddMovie = (movie)=>{
    this.props.dispatch(AddMovieToList(movie));
  }

  render(){
    const {result:movie,showSearchResults } = this.props.search;
      return (
        <div className="nav">
            <div className="search-container">
                <input onChange={this.handlechange}/>
                <button id="search-btn" onClick={this.searchClick}>Search</button>
                {
                  showSearchResults
                  ? <div className="search-results">
                      <div className="search-result">
                        <img src={movie.Poster} alt="search-pic" />
                        <div className="movie-info">
                          <span>{movie.Title}</span>
                          <button onClick={() => this.AddMovie(movie)}>
                            Add to Movies
                          </button>
                        </div>
                      </div>
                    </div>
                  : null
                }
            </div>
        </div>
        
      );
    }
}

export default Navbar;
