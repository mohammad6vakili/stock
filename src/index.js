import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createStore, combineReducers, applyMiddleware} from "redux";
import Reducer from './Store/Reducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {ToastContainer} from "react-toastify";



const rootReducer=combineReducers({
  Reducer:Reducer,
});

const store = createStore(rootReducer , applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}> 
        <ToastContainer rtl autoClose={10000} pauseOnFocusLoss={false}/>
        <App />
      </Provider>
    </BrowserRouter>
    ,
  document.getElementById('root')
);
