import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './App';
import "./index.css";
import movies from "./reducers/index";

// create store and pasing the reducers
const store = createStore(movies);
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


