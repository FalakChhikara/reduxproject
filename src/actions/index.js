// JS object
// {
//     type: "ADD_MOVIES"; // mandatory
//     movies: []
// }

// action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAV_MOVIES = "ADD_FAV_MOVIES";
export const REMOVE_FAV_MOVIES = "REMOVE_FAV_MOVIES";
export const SHOW_FAV = "SHOW_FAV";
export const SHOW_MOVIE = "SHOW_MOVIE";
export const ADD_MOVIE = "ADD_MOVIE";
// action creators
export function addMovies(data){
    return {
        type: ADD_MOVIES,
        movies: data
    }
}

export function addFavMovies(data){
    return {
        type: ADD_FAV_MOVIES,
        movie: data
    }
}


export function removeFavMovies(data){
    return {
        type: REMOVE_FAV_MOVIES,
        movie: data
    }
}

export function showFavourite(val){
    return {
        type: SHOW_FAV,
        val: val
    }
}

export function FinalMovieSearch(movie){
    return {
        type: SHOW_MOVIE,
        movie: movie
    };
}

export function MovieSearch(text){
    const url = `http://www.omdbapi.com/?apikey=3ca5df7&t=${text}`;
    // handle by thunk middleware
    return function(dispatch){
        fetch(url)
            .then(response => response.json())
            .then(movie => {
                console.log(movie);
                dispatch(FinalMovieSearch(movie));
            })
    }
}

export function AddMovieToList(movie){
    return {
        type: ADD_MOVIE,
        movie: movie
    };
}