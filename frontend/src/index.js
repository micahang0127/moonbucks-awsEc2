import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/configureStore';    // redux-saga 사용
// import { createStore } from 'redux'; // ./store/configureStore에서 사용

import rootReducers  from './reducers';
// import { BrowserRouter } from 'react-router-dom';
//import './index.css';
import * as serviceWorker from './serviceWorker';


// const store = createStore( rootReducers, /* preloadedState, */
//     +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//      ); // chrome [ redux devtools extendstion] tool 사용
// const store = create();


console.log(store.getState());  // reducers값 반환



ReactDOM.render(
    <Provider store= {store}>
         {/* <BrowserRouter> */}
             <App />
         {/* </BrowserRouter> */}
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
