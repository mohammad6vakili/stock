import React, { useEffect } from 'react';
import "./StockPanel.css";
import { useSelector , useDispatch} from 'react-redux';
import axios from 'axios';
import moment from "moment";
import { setLastupdate } from '../../Store/Action';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import OrderListTable from './OrderListTable';

const SotckPanel=()=>{
    const dispatch=useDispatch();
    const stockData=useSelector(state=>state.Reducer.stockData);
    const lastUpdate=useSelector(state=>state.Reducer.lastUpdate);

    const lastUpdateReq=async()=>{
        try{
            const response=await axios.get(Env.baseURL + "/history");
            dispatch(setLastupdate(moment(response.data.date).format('DD MMM, YYYY')));
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }
    const clientTypeReq=async()=>{
        try{
            const response = await axios.get(Env.baseURL + `/clienttype?id=${stockData._id}`);
            console.log(response.data);
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    useEffect(()=>{
        lastUpdateReq();
        clientTypeReq();
    },[])

    return(
        <div className="stock-panel-wrapper">
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
                            <div>
                                <span>ارزش بازار</span>
                                <span>
                                    <span>(؟)</span>
                                </span>
                            </div>
                        </div>
                        <div className="stock-panel-body-section-item">
                            <div>
                                <span>آخرین اطلاعات قیمت</span>
                                <span>{lastUpdate}</span>
                            </div>
                            <div>
                                <span>وضعیت</span>
                                <span>مجاز(؟)</span>
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
                                    <span>(؟)</span>
                                </span>
                            </div>
                            <div>
                                <span>حجم مبنا</span>
                                <span>
                                    <span>{JSON.parse(stockData.HajmMabna).toLocaleString()}</span>
                                </span>
                            </div>
                            <div>
                                <span>سهام شناور</span>
                                <span>
                                    <span>(؟)</span>
                                </span>
                            </div>
                            <div>
                                <span>میانگین حجم ماه</span>
                                <span>
                                    <span>(؟)</span>
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
                                <span>(؟)</span>
                            </div>
                            <div>
                                <span>P/E گروه :</span>
                                <span>(؟)</span>
                            </div>
                            <div>
                                <span>P/S گروه :</span>
                                <span>(؟)</span>
                            </div>
                        </div>
                    </div>
                    <div className="stock-panel-body-section">
                        <div className="stock-panel-body-section-item" style={{height:"100%"}}></div>
                    </div>
                </div>
                <div className="stock-panel-extra">
                    <div className="stock-panel-extra-section">
                        <div className="stock-panel-extra-section-header">سفارش</div>
                        <div className="stock-panel-extra-section-body">
                            <OrderListTable/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SotckPanel;