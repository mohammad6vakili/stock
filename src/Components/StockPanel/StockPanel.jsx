import React, { useState,useEffect } from 'react';
import "./StockPanel.css";
import { useSelector , useDispatch} from 'react-redux';
import axios from 'axios';
import { setClientType,setStockOhlc} from '../../Store/Action';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import OrderListTable from './Extra/OrderListTable';
import OhlcChart from './Extra/OhlcChart';
import OhlcChartTwo from './Extra/OhlcChartTwo';
import SaraneChart from './Extra/SaraneChart';
import SaraneChartTwo from './Extra/SaraneChartTwo';
import SaraneChartT from "./Extra/SaraneChartT";
import SaraneChartTwoT from './Extra/SaraneChartTwoT';



const SotckPanel=()=>{
    const dispatch=useDispatch();
    
    // global states-----------------------------------------------
    const stockData=useSelector(state=>state.Reducer.stockData);
    const clienttype=useSelector(state=>state.Reducer.clienttype);
    const stockOhlc=useSelector(state=>state.Reducer.stockOhlc);

    // states-----------------------------------------------
    const [chartPeriod , setChartPeriod]=useState(7);

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

    // visibility states-----------------------------------------------
    const [showOrder , setShowOrder]=useState(true);
    const [showStockChart,setShowStockChart]=useState(true);
    const [showSaraneChart , setShowSaraneChart]=useState(true);
    const [showSaraneChartT , setShowSaraneChartT]=useState(true);
    const [ohlcStatus , setOhlcStatus]=useState(false);
    const [saraneStatus , setSaraneStatus]=useState(false);
    const [saraneStatusT , setSaraneStatusT]=useState(false);

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
                data.push({x:[1],y:[]});
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
            toast.error("خطا در برقراری ارتباط",{
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
            toast.error("خطا در برقراری ارتباط",{
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
            console.log(response.data.time);
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
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    useEffect(()=>{
        clientTypeReq();
        stockOhlcReq();
        hhistoryReq();
        clientseriesReq();
    },[])

    return(
        <div className="stock-panel-wrapper">
            <button onClick={()=>console.log(data)}>click</button>
            <div className="stock-panel">
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
                                    <div className="stock-panel-extra-section-controller">
                                        <div onClick={()=>setShowSaraneChartT(!showSaraneChartT)}>
                                            <span style={{textAlign:"center"}}>سرانه(طول روز)</span>
                                            {showSaraneChartT===true ? <span style={{color:"green",textAlign:"center"}}>نمایش</span> : <span style={{color:"red",textAlign:"center"}}>مخفی</span>}
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
                                <span>نمودار {ohlcStatus===false ? <span>قیمت</span> : <span>قیمت پایانی</span>}</span>
                                <button className="chart-change-status-btn" onClick={()=>setOhlcStatus(!ohlcStatus)}>تغییر وضعیت نمودار</button>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                {ohlcStatus===false 
                                ?
                                    <OhlcChart data={data}/>
                                :
                                    <OhlcChartTwo closeData={closeData} ohlcDate={ohlcDate}/>
                                }
                            </div>
                        </div>
                    }
                    {showSaraneChart===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>نمودار {saraneStatus===false ? <span>سرانه</span> : <span>ارزش</span>}</span>
                                <div>
                                    <button className="chart-change-status-btn" onClick={()=>setSaraneStatus(!saraneStatus)}>تغییر وضعیت نمودار</button>
                                </div>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                {saraneStatus===false ?
                                    <SaraneChart 
                                        saraneDate={saraneDate} 
                                        saraneOne={saraneOne}
                                        saraneTwo={saraneTwo}
                                        saraneThree={saraneThree}
                                        saraneFour={saraneFour}
                                    />
                                :
                                    <SaraneChartTwo 
                                        saraneDate={saraneDate} 
                                        hArzeshOne={hArzeshOne}
                                        hArzeshTwo={hArzeshTwo}
                                        hArzeshThree={hArzeshThree}
                                        hArzeshFour={hArzeshFour}
                                    />
                                }
                            </div>
                        </div>
                    }
                    {showSaraneChartT===true &&
                        <div className="stock-panel-extra-section">
                            <div className="stock-panel-extra-section-header">
                                <span>نمودار {saraneStatusT===false ? <span>سرانه</span> : <span>ارزش</span>} در طول روز</span>
                                <div>
                                    <button className="chart-change-status-btn" onClick={()=>setSaraneStatusT(!saraneStatusT)}>تغییر وضعیت نمودار</button>
                                </div>
                            </div>
                            <div className="stock-panel-extra-section-body">
                                {saraneStatusT===false ?
                                    <SaraneChartT
                                        saraneDateT={saraneDateT} 
                                        saraneOneT={saraneOneT}
                                        saraneTwoT={saraneTwoT}
                                        saraneThreeT={saraneThreeT}
                                        saraneFourT={saraneFourT}
                                    />
                                :
                                    <SaraneChartTwoT
                                        saraneDateT={saraneDateT}
                                        hArzeshOneT={hArzeshOneT}
                                        hArzeshTwoT={hArzeshTwoT}
                                        hArzeshThreeT={hArzeshThreeT}
                                        hArzeshFourT={hArzeshFourT}
                                    />
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default SotckPanel;