import React from 'react';
import "./App.css";
import Market from './Components/Market/Market';
import { Route , Switch} from 'react-router';

const App=()=>{
  return(
    <div className="app">
        <Switch>
          <Market/>
        </Switch>
      </div>
  )
}
export default App;