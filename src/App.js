import React from 'react';
import "./App.css";
import Market from './Components/Market/Market';
import { Route , Switch} from 'react-router';
import Header from './Menu/Header';


const App=()=>{
  return(
    <div className="app">
        <Header/>
        <Switch>
          <Market/>
        </Switch>
      </div>
  )
}
export default App;