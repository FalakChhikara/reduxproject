import { combineReducers } from "redux";
import { ADD_MOVIES, ADD_FAV_MOVIES, REMOVE_FAV_MOVIES,SHOW_FAV } from "../actions/index";

const initialMoviesState = {
    moviesList : [],
    favouriteList: [],
    showFav: 0,
} 
export function movies(currState=initialMoviesState, action){
    // if(action.type===ADD_MOVIES){
    //     // return new state to store
    //     // return action.movies;
    //     return {
    //         ...currState,
    //         moviesList: action.movies
    //     }
    // }
    // else if(action.type===ADD_FAV_MOVIES){

    // }
    // return currState;
    switch(action.type){
        case ADD_MOVIES:
            return {
                ...currState,
                moviesList: action.movies
            }
        case ADD_FAV_MOVIES:
            return {
                ...currState,
                favouriteList: [action.movie, ...currState.favouriteList]
            }
        case REMOVE_FAV_MOVIES:
            const newArray = currState.favouriteList.filter(
                (movie) => movie.Title !== action.movie.Title
            );
            return {
                ...currState,
                favouriteList: newArray
            }
        case SHOW_FAV:
            return {
                ...currState,
                showFav: action.val
            }
        default:
            return currState;
    }
}

const initialSearchState = {
    result: {}
}

export function search(state=initialSearchState,action){
    return state;
}

const initialRootState = {
    movies : initialMoviesState,
    search : initialSearchState,
}

export default function rootReducer(state=initialRootState,action){
    return {
        movies: movies(state.movies,action),
        search: search(state.search,action),
    }
}