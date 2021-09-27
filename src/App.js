import React from 'react';
import "./App.css";
import "./Helper/NotifStyle.css";
import { Route , Switch , Redirect} from 'react-router';
import { useSelector } from 'react-redux';
import Market from './Components/Market/Market';
import Header from './Menu/Header';
import SotckPanel from './Components/StockPanel/StockPanel';


const App=()=>{
  const stockData=useSelector(state=>state.Reducer.stockData);
  return(
    <div className="app">
        <Header/>
        <Switch>
          <Route path="/" exact component={Market}/>
          {stockData ? <Route path="/stock-panel" component={SotckPanel} /> : <Redirect to="/" />}
        </Switch>
      </div>
  )
}
export default App;