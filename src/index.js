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

// const connectedAppComponent = connect(callback)(App);
export function connect(callback) {
  return function(Component) {
    class ConnectedComponent extends React.Component{
      constructor(props){
        super(props);
        this.unSubscribe = this.props.store.subscribe(()=>{
          console.log("Updated Component");
          console.log(this.props.store.getState());
          this.forceUpdate();
        });
      }
      componentWillUnmount = ()=>{
        this.unSubscribe();
      }
      // render(){
      //   return <StoreContext.Consumer>
      //     {(store)=>{
      //         const state = store.getState();
      //         const PROPS = callback(state);
      //         <Component dispatch={store.dispatch} {...PROPS}/>
      //       }}
      //   </StoreContext.Consumer>
      // }
      render(){
        const state = this.props.store.getState();
        const PROPS = callback(state);
        return (
          <Component dispatch={this.props.store.dispatch} {...PROPS}/>
        )
      }
    }
    class ConnectedComponentWrapper extends React.Component{
      render(){
        return <StoreContext.Consumer>
          {(store)=><ConnectedComponent store={store}/>}
        </StoreContext.Consumer>
      }
    }
    return ConnectedComponentWrapper;


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


