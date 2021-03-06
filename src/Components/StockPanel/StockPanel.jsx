import React, { useState,useEffect } from 'react';
import "./StockPanel.css";
import { useSelector , useDispatch} from 'react-redux';
import FormatNumber from "../../Helper/FormatNumber";
import axios from 'axios';
import * as moment from 'jalali-moment';
import { setClientType,setStockData,setStockOhlc, setStockSignal} from '../../Store/Action';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import OrderListTable from './Extra/OrderListTable';
import StockSignals from "./Extra/StockSignals";
import OhlcChart from './Extra/OhlcChart';
import OhlcChartTwo from './Extra/OhlcChartTwo';
import SaraneChart from './Extra/SaraneChart';
import SaraneChartTwo from './Extra/SaraneChartTwo';
import SaraneChartT from "./Extra/SaraneChartT";
import SaraneChartTwoT from './Extra/SaraneChartTwoT';
import EnterMoneyChart from './Extra/EnterMoneyChart';



const SotckPanel=()=>{
    const dispatch=useDispatch();
    
    // global states-----------------------------------------------
    const stockData=useSelector(state=>state.Reducer.stockData);
    const clienttype=useSelector(state=>state.Reducer.clienttype);
    const stockSignal=useSelector(state=>state.Reducer.stockSignal);

    // states-----------------------------------------------
    const [chartPeriod , setChartPeriod]=useState(7);
    const [stockSarane , setStockSarane]=useState(null);

    // ohlc-----------------------------------------------
    const [data , setData]=useState([]);
    const [closeData , setCloseData]=useState([]);
    const [ohlcDate , setOhlcDate]=useState([]);
    
    // hhistory-----------------------------------------------
    const [saraneOne , setSaraneOne]=useState([]);
    const [saraneTwo , setSaraneTwo]=useState([]);
    const [saraneThree , setSaraneThree]=useState([]);
    const [saraneFour , setSaraneFour]=useState([]);
    const [hArzeshOne , setHArzeshOne]=useState([]);
    const [hArzeshTwo , setHArzeshTwo]=useState([]);
    const [hArzeshThree , setHArzeshThree]=useState([]);
    const [hArzeshFour , setHArzeshFour]=useState([]);
    const [saraneDate , setSaraneDate]=useState([]);
    
    // clientseries-----------------------------------------------
    const [saraneDateT , setSaraneDateT]=useState([]);
    const [saraneOneT , setSaraneOneT]=useState([]);
    const [saraneTwoT , setSaraneTwoT]=useState([]);
    const [saraneThreeT , setSaraneThreeT]=useState([]);
    const [saraneFourT , setSaraneFourT]=useState([]);
    const [hArzeshOneT , setHArzeshOneT]=useState([]);
    const [hArzeshTwoT , setHArzeshTwoT]=useState([]);
    const [hArzeshThreeT , setHArzeshThreeT]=useState([]);
    const [hArzeshFourT , setHArzeshFourT]=useState([]);

    // clientseries-----------------------------------------------
    const [enterMoney , setEnterMoney]=useState([]);

    // visibility states-----------------------------------------------
    const [showOrder , setShowOrder]=useState(true);
    const [showSignal , setShowSignal]=useState(true);
    const [showStockChart,setShowStockChart]=useState(true);
    const [showCloseChart , setShowCloseChart]=useState(true);
    const [showSaraneChart , setShowSaraneChart]=useState(true);
    const [showSaraneChartT , setShowSaraneChartT]=useState(true);
    const [showArzeshChart , setShowArzeshChart]=useState(true);
    const [showArzeshChartT , setShowArzeshChartT]=useState(true);
    const [showEnterMoney , setShowEnterMoney]=useState(true);

    // global variables-----------------------------------------------
    var today = new Date();
    var stockLastUpdate = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const stockPtoE=stockData.Payani / stockData.EPS;
    
    
    // functions-----------------------------------------------
    const clientTypeReq=async()=>{
        try{
            const response = await axios.get(Env.baseURL + `/clienttype?id=${stockData._id}`);
            dispatch(setClientType(response.data));
        }catch(err){
            toast.error("?????? ???? ?????????????? ????????????",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            dispatch(setClientType(null));
            console.log(err);
        }
    }

    const stockOhlcReq=async()=>{
        try{
            const response=await axios.get(Env.baseURL + `/history?id=${stockData._id}`);
            dispatch(setStockOhlc(response.data));
            setCloseData(response.data.close.slice(response.data.close.length-chartPeriod - response.data.close.length));
            setOhlcDate(response.data.date.slice(response.data.date.length-chartPeriod - response.data.date.length));
            await response.data.date.map((date,index)=>{
                data.push({x:[moment(date.toString()).locale('fa').format('YYYY/M/D')],y:[]});
            })
            await response.data.open.map((open , index)=>{
                data[index].y.push(open);
            })
            await response.data.hight.map((high,index)=>{
                data[index].y.push(high);
            })
            await response.data.low.map((low,index)=>{
                data[index].y.push(low);
            })
            response.data.close.map((close,index)=>{
                data[index].y.push(close);
            })
            let allLastItem= data.slice(data.length-chartPeriod , data.length);
            setData(allLastItem);
        }catch(err){
            toast.error("?????? ???? ?????????????? ????????????",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const hhistoryReq=async()=>{
        let abHa=[];
        let asHa=[];
        let abHu=[];
        let asHu=[];
        let bHat=[];
        let sHat=[];
        let bHut=[];
        let sHut=[];
        try{
            const response=await axios.get(Env.baseURL + `/hhistory?id=${stockData._id}`);
            setSaraneDate(response.data.date.slice(response.data.date.length-chartPeriod - response.data.date.length));
            abHa = response.data.abHa.slice(response.data.abHa.length-chartPeriod - response.data.abHa.length);
            asHa = response.data.asHa.slice(response.data.asHa.length-chartPeriod - response.data.asHa.length);
            abHu = response.data.abHu.slice(response.data.abHu.length-chartPeriod - response.data.abHu.length);
            asHu = response.data.asHu.slice(response.data.asHu.length-chartPeriod - response.data.asHu.length);
            bHat = response.data.bHat.slice(response.data.bHat.length-chartPeriod - response.data.bHat.length);
            sHat = response.data.sHat.slice(response.data.sHat.length-chartPeriod - response.data.sHat.length);
            bHut = response.data.bHut.slice(response.data.bHut.length-chartPeriod - response.data.bHut.length);
            sHut = response.data.sHut.slice(response.data.sHut.length-chartPeriod - response.data.sHut.length);
            setHArzeshOne(response.data.abHa.slice(response.data.abHa.length-chartPeriod - response.data.abHa.length));
            setHArzeshTwo(response.data.abHu.slice(response.data.abHu.length-chartPeriod - response.data.abHu.length));
            setHArzeshThree(response.data.asHa.slice(response.data.asHa.length-chartPeriod - response.data.asHa.length));
            setHArzeshFour(response.data.asHu.slice(response.data.asHu.length-chartPeriod - response.data.asHu.length));
            setSaraneOne(
                abHa.map((x , index)=>{
                    return Math.round(x/bHat[index])
                })
            )
            setSaraneTwo(
                asHa.map((x , index)=>{
                    return Math.round(x/sHat[index])
                })
            )
            setSaraneThree(
                abHu.map((x , index)=>{
                    return Math.round(x/bHut[index])
                })
            )
            setSaraneFour(
                asHu.map((x , index)=>{
                    return Math.round(x/sHut[index])
                })
            )
        }catch(err){
            toast.error("?????? ???? ?????????????? ????????????",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const clientseriesReq=async()=>{
        let abHa=[];
        let asHa=[];
        let abHu=[];
        let asHu=[];
        let bHat=[];
        let sHat=[];
        let bHut=[];
        let sHut=[];
        try{
            const response=await axios.get(Env.baseURL + `/clientseries?id=${stockData._id}`);
            setSaraneDateT(response.data.time);
            abHa = response.data.abHa.slice(response.data.abHa);
            asHa = response.data.asHa.slice(response.data.asHa);
            abHu = response.data.abHu.slice(response.data.abHu);
            asHu = response.data.asHu.slice(response.data.asHu);
            bHat = response.data.bHat.slice(response.data.bHat);
            sHat = response.data.sHat.slice(response.data.sHat);
            bHut = response.data.bHut.slice(response.data.bHut);
            sHut = response.data.sHut.slice(response.data.sHut);
            setHArzeshOneT(response.data.abHa.slice(response.data.abHa));
            setHArzeshTwoT(response.data.abHu.slice(response.data.abHu));
            setHArzeshThreeT(response.data.asHa.slice(response.data.asHa));
            setHArzeshFourT(response.data.asHu.slice(response.data.asHu));
            setSaraneOneT(
                abHa.map((x , index)=>{
                    return Math.round(x/bHat[index])
                })
            )
            setSaraneTwoT(
                asHa.map((x , index)=>{
                    return Math.round(x/sHat[index])
                })
            )
            setSaraneThreeT(
                abHu.map((x , index)=>{
                    return Math.round(x/bHut[index])
                })
            )
            setSaraneFourT(
                asHu.map((x , index)=>{
                    return Math.round(x/sHut[index])
                })
            )
        }catch(err){
            toast.error("?????? ???? ?????????????? ????????????",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const getStockSignal=async()=>{
        try{
            const response=await axios.get(Env.baseURL + `/signal?id=${stockData._id}`);
            dispatch(setStockSignal(response.data));
        }catch(err){
            toast.error("?????? ???? ?????????????? ????????????",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const getStockSarane=async()=>{
        try{
            const response=await axios.get(Env.baseURL + `/sarane?id=${stockData._id}`)
            setStockSarane(response.data);
        }catch(err){
            toast.error("?????? ???? ?????????????? ????????????",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const getEnterMoney=async()=>{
        try{
            const response=await axios.get(Env.baseURL + `/vorudpul?id=${stockData._id}`);
            response.data.time.map((data,index)=>{
                enterMoney.push([data,response.data.data[index]]);
            })
            setEnterMoney(enterMoney.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60),data[1]];
            }))
        }catch(err){
            dispatch(setClientType(null));
            console.log(err);
        }
    }

    useEffect(()=>{
        clientTypeReq();
        stockOhlcReq();
        hhistoryReq();
        clientseriesReq();
        getStockSignal();
        getStockSarane();
        getEnterMoney();
        const interval = setInterval(async() => {
            try{
                const response = await axios.get(`http://45.159.113.106:5000/market?id=${stockData._id}`);
                dispatch(setStockData(response.data))
            }catch(err){
                toast.error("?????? ???? ?????????????? ????????????",{
                    position: toast.POSITION.BOTTOM_LEFT
                    });
                console.log(err);
            }
        }, 30000);
        return () => {
          clearInterval(interval);
        };
    },[])


    return(
        <div className="stock-panel-wrapper">
            <div className="stock-panel">
                <div className="stock-panel-header">
                    <div>{stockData.Name} ({stockData.Namad})</div>
                    <div className="stock-panel-extra-section-controller-wrapper">
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowOrder(!showOrder)}>
                                <span style={{textAlign:"center"}}>??????????</span>
                                {showOrder===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowSignal(!showSignal)}>
                                <span style={{textAlign:"center"}}>???????????? ????</span>
                                {showSignal===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowStockChart(!showStockChart)}>
                                <span style={{textAlign:"center"}}>???????????? ????????</span>
                                {showStockChart===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowCloseChart(!showCloseChart)}>
                                <span style={{textAlign:"center"}}>???????????? ???????? ????????????</span>
                                {showCloseChart===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowSaraneChart(!showSaraneChart)}>
                                <span style={{textAlign:"center"}}>??????????</span>
                                {showSaraneChart===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowArzeshChart(!showArzeshChart)}>
                                <span style={{textAlign:"center"}}>????????</span>
                                {showArzeshChart===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowSaraneChartT(!showSaraneChartT)}>
                                <span style={{textAlign:"center"}}>??????????(?????? ??????)</span>
                                {showSaraneChartT===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowArzeshChartT(!showArzeshChartT)}>
                                <span style={{textAlign:"center"}}>????????(?????? ??????)</span>
                                {showArzeshChartT===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                        <div className="stock-panel-extra-section-controller">
                            <div onClick={()=>setShowEnterMoney(!showEnterMoney)}>
                                <span style={{textAlign:"center"}}>???????? ??????</span>
                                {showEnterMoney===true ? <span style={{color:"green",textAlign:"center"}}>??????????</span> : <span style={{color:"red",textAlign:"center"}}>????????</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stock-panel-body">
                    <div className="stock-panel-body-section">
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>?????????? ????????????</span>
                                <span style={{direction:"ltr"}}>
                                    <span style={((stockData.Close - stockData.Yesterday)*100/stockData.Yesterday)>0?{color:"green",marginRight:"5px"}:{color:"red",marginRight:"5px"}}>
                                        [{((stockData.Close - stockData.Yesterday)*100/stockData.Yesterday).toFixed(1)}%]
                                    </span>
                                    <span style={stockData.Close - stockData.Yesterday>0?{color:"green"}:{color:"red"}}>({stockData.Close - stockData.Yesterday})</span>
                                    <span style={{marginLeft:"20px"}}>{JSON.parse(stockData.Close).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>???????? ????????????</span>
                                <span style={{direction:"ltr"}}>
                                    <span style={((stockData.Payani - stockData.Yesterday)*100/stockData.Yesterday)>0?{color:"green",marginRight:"5px"}:{color:"red",marginRight:"5px"}}>
                                        [{((stockData.Payani - stockData.Yesterday)*100/stockData.Yesterday).toFixed(2)}%]
                                    </span>
                                    <span style={stockData.Payani - stockData.Yesterday>0?{color:"green"}:{color:"red"}}>({stockData.Payani - stockData.Yesterday})</span>
                                    <span style={{marginLeft:"20px",fontSize:"17px",fontWeight:900}}>{JSON.parse(stockData.Payani).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>?????????? ????????</span>
                                <span>
                                    <span>{JSON.parse(stockData.Open).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>?????????? ??????????</span>
                                <span>
                                    <span>{JSON.parse(stockData.Yesterday).toLocaleString()}</span>
                                </span>
                            </div>
                        </div>
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>?????????? ??????????????</span>
                                <span>
                                    <span>{JSON.parse(stockData.Tedad).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>?????? ??????????????</span>
                                <span>
                                    <span>{FormatNumber(stockData.Hajm)}</span>
                                </span>
                            </div>
                            <div>
                                <span>???????? ??????????????</span>
                                <span>
                                    <span>{FormatNumber(stockData.Arzesh)}</span>
                                </span>
                            </div>
                        </div>
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>?????????? ?????????????? ????????</span>
                                <span>{stockLastUpdate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="stock-panel-body-section">  
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>???????? ??????</span>
                                <span style={{direction:"ltr"}}>
                                    <span>{JSON.parse(stockData.Low).toLocaleString()}</span>
                                    <span style={{margin:"0 10px"}}>_</span>
                                    <span>{JSON.parse(stockData.High).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>???????? ????????</span>
                                <span style={{direction:"ltr"}}>
                                    <span>{JSON.parse(stockData.HadeMojazD).toLocaleString()}</span>
                                    <span style={{margin:"0 10px"}}>_</span>
                                    <span>{JSON.parse(stockData.HadeMojazU).toLocaleString()}</span>
                                </span>
                            </div>
                        </div>
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>?????????? ????????</span>
                                <span>
                                    <span>{FormatNumber(stockData.TedadSaham)}</span>
                                </span>
                            </div>
                            <div>
                                <span>?????? ????????</span>
                                <span>
                                    <span>{FormatNumber(stockData.HajmMabna)}</span>
                                </span>
                            </div>
                        </div>
                        <div className="stock-panel-body-section-item span-unset-width-wrapper" style={{flexDirection:"row"}}>
                            <div>
                                <span>EPS :</span>
                                <span>{stockData.EPS}</span>
                            </div>
                            <div>
                                <span>P/E :</span>
                                <span>{stockPtoE.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="stock-panel-body-section">
                        {clienttype ?
                            <div className="stock-panel-body-section-item">
                                <div>
                                    <span></span>
                                    <span>????????</span>
                                    <span>????????</span>
                                </div>
                                <div>
                                    <span>?????? ??????????</span>
                                    <span>{FormatNumber(clienttype.bHa)}</span>
                                    <span>{FormatNumber(clienttype.sHa)}</span>
                                </div>
                                <div>
                                    <span>?????? ??????????</span>
                                    <span>{FormatNumber(clienttype.bHu)}</span>
                                    <span>{FormatNumber(clienttype.sHu)}</span>
                                </div>
                                <div>
                                    <span>?????????? ??????????</span>
                                    <span>{clienttype.bHat.toLocaleString()}</span>
                                    <span>{clienttype.sHat.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>?????????? ??????????</span>
                                    <span>{clienttype.bHut.toLocaleString()}</span>
                                    <span>{clienttype.sHut.toLocaleString()}</span>
                                </div>
                            </div>
                            :
                            <div className="stock-panel-body-section-item">
                                <div>
                                    <span></span>
                                    <span>????????</span>
                                    <span>????????</span>
                                </div>
                                <div>
                                    <span>?????? ??????????</span>
                                </div>
                                <div>
                                    <span>?????? ??????????</span>
                                </div>
                                <div>
                                    <span>?????????? ??????????</span>
                                </div>
                                <div>
                                    <span>?????????? ??????????</span>
                                </div>
                            </div>
                        }
                        {stockSarane ?
                            <div className="stock-panel-body-section-item stock-panel-body-section-item-secondary">
                                <div>
                                    <span>?????????? ???????? ?????????? :</span>
                                    <span>{stockSarane.S_bHa.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ?????????? :</span>
                                    <span>{stockSarane.S_bHu.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ?????????? :</span>
                                    <span>{stockSarane.S_sHa.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ?????????? :</span>
                                    <span>{stockSarane.S_sHu.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ???? ?????????? :</span>
                                    <span>{stockSarane.SaraneB.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ???? ?????????? :</span>
                                    <span>{stockSarane.SaraneS.toLocaleString()}</span>
                                </div>
                            </div>
                            :
                            <div className="stock-panel-body-section-item stock-panel-body-section-item-secondary">
                                <div>
                                    <span>?????????? ???????? ?????????? :</span>
                                    <span></span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ?????????? :</span>
                                    <span></span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ?????????? :</span>
                                    <span></span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ?????????? :</span>
                                    <span></span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ???? ?????????? :</span>
                                    <span></span>
                                </div>
                                <div>
                                    <span>?????????? ???????? ???? ?????????? :</span>
                                    <span></span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="stock-panel-extra">
                    {showOrder===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>??????????</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                <OrderListTable/>
                            </div>
                        </div>
                    }
                    {showSignal===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>???????????? ????</span>
                                <span>{stockSignal && stockSignal.time}</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                <StockSignals/>
                            </div>
                        </div>
                    }
                    {showStockChart===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>???????????? ????????</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                    <OhlcChart data={data}/>
                            </div>
                        </div>
                    }
                    {showCloseChart===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>???????????? ???????? ????????????</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                    <OhlcChartTwo closeData={closeData} ohlcDate={ohlcDate}/>
                            </div>
                        </div>
                    }
                    {showSaraneChart===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>???????????? ??????????</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                    <SaraneChart 
                                        saraneDate={saraneDate} 
                                        saraneOne={saraneOne}
                                        saraneTwo={saraneTwo}
                                        saraneThree={saraneThree}
                                        saraneFour={saraneFour}
                                    />
                                    {/* <SaraneChartTwo 
                                        saraneDate={saraneDate} 
                                        hArzeshOne={hArzeshOne}
                                        hArzeshTwo={hArzeshTwo}
                                        hArzeshThree={hArzeshThree}
                                        hArzeshFour={hArzeshFour}
                                    /> */}
                            </div>
                        </div>
                    }
                    {showArzeshChart===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>???????????? ????????</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                <SaraneChartTwo 
                                    saraneDate={saraneDate} 
                                    hArzeshOne={hArzeshOne}
                                    hArzeshTwo={hArzeshTwo}
                                    hArzeshThree={hArzeshThree}
                                    hArzeshFour={hArzeshFour}
                                />
                            </div>
                        </div>
                    }
                    {showSaraneChartT===true &&
                        <div className="stock-panel-extra-section" style={{width:"100%"}}>
                            <div className="stock-panel-extra-section-header">
                                <span>???????????? ?????????? ???? ?????? ??????</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                <SaraneChartT
                                    saraneDateT={saraneDateT} 
                                    saraneOneT={saraneOneT}
                                    saraneTwoT={saraneTwoT}
                                    saraneThreeT={saraneThreeT}
                                    saraneFourT={saraneFourT}
                                />
                            </div>
                        </div>
                    }
                    {showArzeshChartT===true &&
                        <div className="stock-panel-extra-section" style={{width:"100%"}}>
                            <div className="stock-panel-extra-section-header">
                                <span>???????????? ???????? ???? ?????? ??????</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                <SaraneChartTwoT
                                    saraneDateT={saraneDateT}
                                    hArzeshOneT={hArzeshOneT}
                                    hArzeshTwoT={hArzeshTwoT}
                                    hArzeshThreeT={hArzeshThreeT}
                                    hArzeshFourT={hArzeshFourT}
                                />
                            </div>
                        </div>
                    }
                    {showEnterMoney===true &&
                        <div className="stock-panel-extra-section" style={{width:"100%"}}>
                            <div className="stock-panel-extra-section-header">
                                <span>???????????? ???????? ??????</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                <EnterMoneyChart
                                    enterMoney={enterMoney}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default SotckPanel;