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