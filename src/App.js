import React,{useEffect} from 'react';
import "./App.css";
import "./Helper/NotifStyle.css";
import { Route , Switch , Redirect} from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import { setMarketData } from './Store/Action';
import Env from "./Constant/Env.json";
import { toast } from 'react-toastify';
import axios from 'axios';
import Market from './Components/Market/Market';
import Header from './Menu/Header';
import SotckPanel from './Components/StockPanel/StockPanel';
import Signals from './Components/Signals/Signals';


const App=()=>{
  const dispatch=useDispatch();
  const stockData=useSelector(state=>state.Reducer.stockData);
  const marketData=useSelector(state=>state.Reducer.marketData);

  useEffect(()=>{
    getMarketData();
},[])

const getMarketData=async()=>{
    try{
        const response=await axios.get(Env.baseURL + "/market");
        dispatch(setMarketData(response.data.data));
    }catch(err){
        toast.error("خطا در برقراری ارتباط",{
            position: toast.POSITION.BOTTOM_LEFT
            });
        console.log(err);
    }
}

  return(
    <div className="app">
        <Header/>
        <Switch>
          <Route path="/" exact component={Market}/>
          {marketData ? <Route path="/signals" component={Signals} /> : <Redirect to="/" />}
          {stockData ? <Route path="/stock-panel" component={SotckPanel} /> : <Redirect to="/" />}
        </Switch>
      </div>
  )
}
export default App;