import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";

import App from './component/App';
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
      if(typeof action !== "function"){
        console.log("ACTION TYPE = ", action.type);
      }
      next(action);
    }
  }
}
// Middleware-2
// const logger1 = ({dispatch,getState}) => (next) => (action) => {
//   console.log("action type = ", action.type);
//   next(action);
// }

// Middleware thunk
// const thunk = ({dispatch,getState}) => (next) => (action) => {
//   if(typeof action === "function"){
//     action(dispatch);
//     return;
//   }
//   return next(action);
// }

// create store and pasing the reducers
const store = createStore(rootReducer,applyMiddleware(logger,thunk));
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

export const StoreContext = createContext();

class Provider extends React.Component {
  render(){
    const {store} = this.props;
    return <StoreContext.Provider value={store}>
      {this.props.children}
    </StoreContext.Provider>
  }
}

ReactDOM.render(
  <React.StrictMode>
    {/* <StoreContext.Provider value={store}>
      <App store={store} />
    </StoreContext.Provider> */}

    {/* if value of store changes than components which is using store 
    automatically reRendered */}
    <Provider store={store}>
      {/* <App store={store} /> */}
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


