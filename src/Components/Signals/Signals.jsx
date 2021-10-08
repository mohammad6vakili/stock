import React, { useEffect, useState } from 'react';
import "./Signals.css";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { useSelector , useDispatch } from 'react-redux';
import {setSignals} from "../../Store/Action";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { toast } from 'react-toastify';
import { Spin , Modal} from 'antd';


const Signals =()=>{
    const dispatch=useDispatch();
    const [rowData , setRowData]=useState([]);
    const [modal , setModal]=useState(false);
    const [modalVal , setModalVal]=useState(null);
    const signals=useSelector(state=>state.Reducer.signals);
    const marketData=useSelector(state=>state.Reducer.marketData);
    // const stockData=useSelector(state=>state.Reducer.stockData);
    const getSignalsData=async()=>{
        try{
            const response=await axios.get(Env.baseURL + "/signal");
            response.data.data.map((signal)=>{
                marketData.map((market)=>{
                    if(market._id===signal._id){
                        signal.name=market.Name;
                        signal.namad=market.Namad;
                    }
                })
            })
            response.data.data.map((data)=>{
                if(
                    data.S_bHa===true ||
                    data.S_bHu===true ||
                    data.S_sHa===true ||
                    data.S_sHu===true ||
                    data.SaraneB===true ||
                    data.SaraneS===true ||
                    data.USD_S_bHa===true ||
                    data.USD_S_bHu===true ||
                    data.USD_S_sHa===true ||
                    data.USD_S_sHu===true ||
                    data.USD_SaraneB===true ||
                    data.USD_SaraneS===true
                ){
                    return data.S_bHa="✔",
                    data.S_bHu="✔",
                    data.S_sHa="✔",
                    data.S_sHu="✔",
                    data.SaraneB="✔",
                    data.SaraneS="✔",
                    data.USD_S_bHa="✔",
                    data.USD_S_bHu="✔",
                    data.USD_S_sHa="✔",
                    data.USD_S_sHu="✔",
                    data.USD_SaraneB="✔",
                    data.USD_SaraneS="✔"
                }else{
                    return data.S_bHa="",
                    data.S_bHu="",
                    data.S_sHa="",
                    data.S_sHu="",
                    data.SaraneB="",
                    data.SaraneS="",
                    data.USD_S_bHa="",
                    data.USD_S_bHu="",
                    data.USD_S_sHa="",
                    data.USD_S_sHu="",
                    data.USD_SaraneB="",
                    data.USD_SaraneS=""
                }
            })
            dispatch(setSignals(response.data.data));
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
                rowData.push({time:data._id,signalLength:Object.keys(data).length-1,namads:Object.keys(data).filter((data)=>data !== "_id")});
            });
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const getSelectedRowData=(val)=>{
        setModalVal(val.data);
        console.log(val.data);
        setModal(true);
    }

    useEffect(()=>{
        getSignalsData();
        getTodaySignal();
    },[])

    return(
        <div className="signals">
            {modalVal &&
            <Modal 
                className="search-stock-modal" 
                title={"سیگنال های " + modalVal.time} 
                visible={modal} 
                onOk={()=>setModal(false)} 
                onCancel={()=>setModal(false)}
                footer={[]}
            >
                {modalVal.namads.map((val)=>(
                    <div>
                        {marketData.map((market)=>{
                            if(market._id === val){
                                return market.Namad
                            }
                        })}
                    </div>
                ))}                    
            </Modal>
            }
            {!signals ? <Spin size="large" />  :
                <div
                    className="ag-theme-alpine"
                    style={{height:"100%",width:"100%"}}
                >
                              <AgGridReact
                                enableRtl={true}
                                rowSelection={'single'}
                                rowDragManaged={true}
                                defaultColDef={{
                                    sortable: true,
                                    filter: true,
                                    resizable: true,
                                }}
                                defaultColGroupDef={{ marryChildren: true }}
                                columnTypes={{
                                numberColumn: {
                                    width: 130,
                                    filter: 'agNumberColumnFilter',
                                },
                                medalColumn: {
                                    width: 100,
                                    columnGroupShow: 'open',
                                    filter: false,
                                },
                                nonEditableColumn: { editable: false },
                                dateColumn: {
                                    filter: 'agDateColumnFilter',
                                    filterParams: {
                                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                                        var dateParts = cellValue.split('/');
                                        var day = Number(dateParts[0]);
                                        var month = Number(dateParts[1]) - 1;
                                        var year = Number(dateParts[2]);
                                        var cellDate = new Date(year, month, day);
                                        if (cellDate < filterLocalDateAtMidnight) {
                                        return -1;
                                        } else if (cellDate > filterLocalDateAtMidnight) {
                                        return 1;
                                        } else {
                                        return 0;
                                        }
                                    },
                                    },
                                },
                                }}
                                rowData={rowData}
                                onRowClicked={(val)=>getSelectedRowData(val)}
                                // onRowDoubleClicked={(val)=>getStockDataHandler(val)}
                                rowStyle={{cursor:"pointer"}}
                            >
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={100} rowDrag={true} headerName="زمان" field="time"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}}  width={140} headerName="تعداد سهام سیگنال شده" field="signalLength"/>
                                {/* <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={60} headerName="قیمت" field="price" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={110} headerName="سرانه خرید حقیقی" field="S_bHa" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={110} headerName="سرانه خرید حقوقی" field="S_bHu" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={115} headerName="سرانه فروش حقیقی" field="S_sHa" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={115} headerName="سرانه فروش حقوقی" field="S_sHu" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={110} headerName="سرانه خرید کل بازار" field="SaraneB" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={115} headerName="سرانه فروش کل بازار" field="SaraneS" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={135} headerName="سرانه دلاری خرید حقیقی" field="USD_S_bHa" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={135} headerName="سرانه دلاری خرید حقوقی" field="USD_S_bHu" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={140} headerName="سرانه دلاری فروش حقیقی" field="USD_S_sHa" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={140} headerName="سرانه دلاری فروش حقوقی" field="USD_S_sHu" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={140} headerName="سرانه دلاری خرید کل بازار" field="USD_SaraneB" type="numberColumn"/>
                                <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={145} headerName="سرانه دلاری فروش کل بازار" field="USD_SaraneS" type="numberColumn"/> */}
                            </AgGridReact>
                </div>
            }
        </div>
    )
}
export default Signals;