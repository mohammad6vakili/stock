import React, { useState,useEffect } from 'react';
import "./StockPanel.css";
import { useSelector , useDispatch} from 'react-redux';
import axios from 'axios';
import { setClientType,setStockOhlc, setStockSarane } from '../../Store/Action';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import OrderListTable from './Extra/OrderListTable';
import OhlcChart from './Extra/OhlcChart';
import SaraneChart from './Extra/SaraneChart';

const SotckPanel=()=>{
    const dispatch=useDispatch();
    const stockData=useSelector(state=>state.Reducer.stockData);
    const clienttype=useSelector(state=>state.Reducer.clienttype);
    const stockOhlc=useSelector(state=>state.Reducer.stockOhlc);
    const stockSarane=useSelector(state=>state.Reducer.stockSarane);
    const [data , setData]=useState([]);
    const [saraneData , setSaraneData]=useState([]);
    const [saraneDate , setSaraneDate]=useState([]);
    const [chartPeriod , setChartPeriod]=useState(30);
    const [showOrder , setShowOrder]=useState(true);
    const [showStockChart,setShowStockChart]=useState(false);
    const [showSaraneChart , setShowSaraneChart]=useState(true);
    var today = new Date();
    var stockLastUpdate = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const stockPtoE=stockData.Payani / stockData.EPS;

    const clientTypeReq=async()=>{
        try{
            const response = await axios.get(Env.baseURL + `/clienttype?id=${stockData._id}`);
            dispatch(setClientType(response.data));
        }catch(err){
            dispatch(setClientType(null));
            console.log(err);
        }
    }

    const stockOhlcReq=async()=>{
        try{
            const response=await axios.get(Env.baseURL + `/history?id=${stockData._id}`);
            dispatch(setStockOhlc(response.data))
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const hhistoryReq=async()=>{
        try{
            const response=await axios.get(Env.baseURL + `/hhistory?id=${stockData._id}`);
            dispatch(setStockSarane(response.data));
            setSaraneDate(response.data.date.slice(response.data.date.length-chartPeriod - response.data.date.length));
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const generateChartData=async()=>{
        if(stockOhlc){
            await stockOhlc.date.map((date,index)=>{
                data.push({x:date,y:[]});
            })
            await stockOhlc.open.map((open , index)=>{
                data[index].y.push(open);
            })
            await stockOhlc.hight.map((high,index)=>{
                data[index].y.push(high);
            })
            await stockOhlc.low.map((low,index)=>{
                data[index].y.push(low);
            })
            stockOhlc.close.map((close,index)=>{
                data[index].y.push(close);
            })
        }
    }

    const finalGenerateChartData=()=>{
            generateChartData();
            let allLastItem= data.slice(data.length-chartPeriod , data.length);
            setData(allLastItem);
    }

    useEffect(()=>{
        clientTypeReq();
        stockOhlcReq();
        hhistoryReq();
    },[])

    useEffect(()=>{
        finalGenerateChartData();
    },[stockOhlc])

    return(
        <div className="stock-panel-wrapper">
            <div className="stock-panel">
                <button onClick={()=>console.log(saraneDate)}>clicl</button>
                <div className="stock-panel-header">{stockData.Name}({stockData.Namad})</div>
                <div className="stock-panel-body">
                    <div className="stock-panel-body-section">
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>آخرین معامله</span>
                                <span style={{direction:"ltr"}}>
                                    <span style={stockData.Close - stockData.Yesterday>0?{color:"green"}:{color:"red"}}>({stockData.Close - stockData.Yesterday})</span>
                                    <span style={{marginLeft:"20px"}}>{JSON.parse(stockData.Close).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>قیمت پایانی</span>
                                <span style={{direction:"ltr"}}>
                                    <span style={stockData.Payani - stockData.Yesterday>0?{color:"green"}:{color:"red"}}>({stockData.Payani - stockData.Yesterday})</span>
                                    <span style={{marginLeft:"20px",fontSize:"17px",fontWeight:900}}>{JSON.parse(stockData.Payani).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>اولین قیمت</span>
                                <span>
                                    <span>{JSON.parse(stockData.Open).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>اولین دیروز</span>
                                <span>
                                    <span>{JSON.parse(stockData.Yesterday).toLocaleString()}</span>
                                </span>
                            </div>
                        </div>
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>تعداد معاملات</span>
                                <span>
                                    <span>{JSON.parse(stockData.Tedad).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>حجم معاملات</span>
                                <span>
                                    <span>{JSON.parse(stockData.Hajm).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>ارزش معاملات</span>
                                <span>
                                    <span>{JSON.parse(stockData.Arzesh).toLocaleString()}</span>
                                </span>
                            </div>
                        </div>
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>آخرین اطلاعات قیمت</span>
                                <span>{stockLastUpdate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="stock-panel-body-section">
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>بازه روز</span>
                                <span style={{direction:"ltr"}}>
                                    <span>{JSON.parse(stockData.Low).toLocaleString()}</span>
                                    <span style={{margin:"0 10px"}}>_</span>
                                    <span>{JSON.parse(stockData.High).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>قیمت مجاز</span>
                                <span style={{direction:"ltr"}}>
                                    <span>{JSON.parse(stockData.HadeMojazD).toLocaleString()}</span>
                                    <span style={{margin:"0 10px"}}>_</span>
                                    <span>{JSON.parse(stockData.HadeMojazU).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>بازه هفته</span>
                                <span>
                                    <span>(؟)</span>
                                    <span style={{margin:"0 10px"}}>_</span>
                                    <span>(؟)</span>
                                </span>
                            </div>
                            <div>
                                <span>بازه سال</span>
                                <span>
                                    <span>(؟)</span>
                                    <span style={{margin:"0 10px"}}>_</span>
                                    <span>(؟)</span>
                                </span>
                            </div>
                        </div>
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>تعداد سهام</span>
                                <span>
                                    <span>{stockData.TedadSaham}</span>
                                </span>
                            </div>
                            <div>
                                <span>حجم مبنا</span>
                                <span>
                                    <span>{JSON.parse(stockData.HajmMabna).toLocaleString()}</span>
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
                                    <span>خرید</span>
                                    <span>فروش</span>
                                </div>
                                <div>
                                    <span>حجم حقیقی</span>
                                    <span>{clienttype.bHa.toLocaleString()}</span>
                                    <span>{clienttype.sHa.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>حجم حقوقی</span>
                                    <span>{clienttype.bHu.toLocaleString()}</span>
                                    <span>{clienttype.sHu.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>تعداد حقیقی</span>
                                    <span>{clienttype.bHat.toLocaleString()}</span>
                                    <span>{clienttype.sHat.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>تعداد حقوقی</span>
                                    <span>{clienttype.bHut.toLocaleString()}</span>
                                    <span>{clienttype.sHut.toLocaleString()}</span>
                                </div>
                            </div>
                            :
                            <div className="stock-panel-body-section-item">
                                <div>
                                    <span></span>
                                    <span>خرید</span>
                                    <span>فروش</span>
                                </div>
                                <div>
                                    <span>حجم حقیقی</span>
                                </div>
                                <div>
                                    <span>حجم حقوقی</span>
                                </div>
                                <div>
                                    <span>تعداد حقیقی</span>
                                </div>
                                <div>
                                    <span>تعداد حقوقی</span>
                                </div>
                            </div>
                        }
                        <div className="stock-panel-body-section-item">
                            <div style={{width:"100%",display:"flex",justifyContent:'center'}}>ابزار نمایش اطلاعات</div>
                                <div className="stock-panel-extra-section-controller-wrapper">    
                                    <div className="stock-panel-extra-section-controller">
                                        <div onClick={()=>setShowOrder(!showOrder)}>
                                            <span style={{textAlign:"center"}}>سفارش</span>
                                            {showOrder===true ? <span style={{color:"green",textAlign:"center"}}>نمایش</span> : <span style={{color:"red",textAlign:"center"}}>مخفی</span>}
                                        </div>
                                    </div>
                                    <div className="stock-panel-extra-section-controller">
                                        <div onClick={()=>setShowStockChart(!showStockChart)}>
                                            <span style={{textAlign:"center"}}>نمودار</span>
                                            {showStockChart===true ? <span style={{color:"green",textAlign:"center"}}>نمایش</span> : <span style={{color:"red",textAlign:"center"}}>مخفی</span>}
                                        </div>
                                    </div>
                                    <div className="stock-panel-extra-section-controller">
                                        <div onClick={()=>setShowSaraneChart(!showSaraneChart)}>
                                            <span style={{textAlign:"center"}}>سرانه</span>
                                            {showSaraneChart===true ? <span style={{color:"green",textAlign:"center"}}>نمایش</span> : <span style={{color:"red",textAlign:"center"}}>مخفی</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="stock-panel-extra">
                    {showOrder===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>سفارش</span>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                <OrderListTable/>
                            </div>
                        </div>
                    }
                    {showStockChart===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>نمودار</span>
                            </div>
                            <div className="stock-panel-extra-section-body" id="mohammad">
                                <OhlcChart data={data}/>
                            </div>
                        </div>
                    }
                    {showSaraneChart===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>نمودار سرانه</span>
                            </div>
                            <div className="stock-panel-extra-section-body" id="mohammad">
                                <SaraneChart saraneDate={saraneDate}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default SotckPanel;