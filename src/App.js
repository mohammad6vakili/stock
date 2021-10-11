import React,{useEffect} from 'react';
import "./App.css";
import "./Helper/NotifStyle.css";
import { Route , Switch , Redirect} from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import { setMarketData, setTodaySignal } from './Store/Action';
import Env from "./Constant/Env.json";
import { toast } from 'react-toastify';
import axios from 'axios';
import Market from './Components/Market/Market';
import Header from './Menu/Header';
import SotckPanel from './Components/StockPanel/StockPanel';
import Signals from './Components/Signals/Signals';
import Charts from './Components/Charts/Charts';

const App=()=>{
  const dispatch=useDispatch();
  const stockData=useSelector(state=>state.Reducer.stockData);
  const marketData=useSelector(state=>state.Reducer.marketData);
  const todaySignal=useSelector(state=>state.Reducer.todaySignal);

  useEffect(()=>{
    getMarketData();
    getTodaySignal();
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
const getTodaySignal=async()=>{
  try{
      const response=await axios.get(Env.baseURL + "/todaysignal");
      response.data.data.map((data)=>{
        todaySignal.push({
          time:data._id,
          signalLength:Object.keys(data).length-1,
          namads:Object.keys(data).filter((data)=>data !== "_id"),
          price:Object.values(data).map((x)=>x.price),
          sigs:Object.values(data).map((x)=>x.signal),
          names:
          Object.keys(data).filter((data)=>data !== "_id").map((namad)=>{
                marketData && marketData.map((data)=>{
                    if(namad===data._id){
                        return data.Namad
                    }
                })
        })
        });
      });
        if(!todaySignal===[]){
                todaySignal.map((sig)=>{
                    sig.namads.map((namad)=>{
                        marketData.map((data)=>{
                            if(namad===data._id){
                                sig.names.push(data.Namad)
                            }
                        })
                    })
                })
        }
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
          {marketData ? <Route path="/charts" component={Charts} /> : <Redirect to="/" />}
          {marketData ? <Route path="/signals" component={Signals} /> : <Redirect to="/" />}
          {stockData ? <Route path="/stock-panel" component={SotckPanel} /> : <Redirect to="/" />}
        </Switch>
      </div>
  )
}
export default App;