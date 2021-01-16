import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import "./index.css";
import rootReducer from "./reducers/index";


// Middleware-1
// obj = {dispatch,getState}
// function logger(obj,next,action)
// logger(obj)(next)(action) // currying
const logger = function({dispatch,getState}){
  return function(next){
    return function(action){
      // middleWare code
      console.log("ACTION TYPE = ", action.type);
      next(action);
    }
  }
}
// Middleware-2
const logger1 = ({dispatch,getState}) => (next) => (action) => {
  console.log("action type = ", action.type);
  next(action);
}

// create store and pasing the reducers
const store = createStore(rootReducer,applyMiddleware(logger,logger1));
console.log("store ", store);
// internally called reducer movies(undefined,{});
console.log("before state ", store.getState());

// dispatch takes action as a arg
// send action to reducers
// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{name:"falak"}]
// });

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{name:"hello"}]
// });

// console.log("after state ", store.getState());


ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);


