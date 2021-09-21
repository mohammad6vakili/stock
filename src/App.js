import React from 'react';
import "./App.css";
import "./Helper/NotifStyle.css";
import { Route , Switch} from 'react-router';
import Market from './Components/Market/Market';
import Header from './Menu/Header';
import SotckPanel from './Components/StockPanel/StockPanel';


const App=()=>{
  return(
    <div className="app">
        <Header/>
        <Switch>
          <Route path="/" exact component={Market}/>
          <Route path="/stock-panel" exact component={SotckPanel}/>
        </Switch>
      </div>
  )
}
export default App;