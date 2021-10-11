import React, { useEffect, useState } from 'react';
import "./Signals.css";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { useSelector , useDispatch } from 'react-redux';
import {setSidePanel, setTodaySignal} from "../../Store/Action";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { toast } from 'react-toastify';
import { Spin , Modal} from 'antd';


const Signals =()=>{
    const dispatch=useDispatch();
    const [modal , setModal]=useState(false);
    const [modalVal , setModalVal]=useState(null);
    const [tableData , setTableData]=useState([]);
    const marketData=useSelector(state=>state.Reducer.marketData);
    const todaySignal=useSelector(state=>state.Reducer.todaySignal);


    const getSelectedRowData=(val)=>{
        setModalVal(val.data);
        console.log(val.data);
        setModal(true);
    }


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
                <div className="search-stock-modal-body" style={{flexDirection:"row"}}>
                    <div>
                        <h2>نماد</h2>
                        {modalVal.namads.map((val)=>(
                                <div style={{marginBottom:"7px"}}>
                                    {marketData.map((market)=>{
                                        if(market._id === val){
                                            return market.Namad
                                        }
                                    })}
                                </div>
                        ))}
                    </div>                    
                    <div>
                        <h2>قیمت</h2>
                        {modalVal.price.map((pric)=>(
                            <div style={{marginBottom:"7px"}}>{pric}</div>
                        ))}
                    </div>
                    <div>
                        <h2>سیگنال</h2>
                        {
                            modalVal.sigs.map((signal)=>{
                                if(typeof(signal)==="object"){
                                    for (let index=0;index<signal.length;index++) {
                                        return <div style={{marginBottom:"7px"}}>{signal[index]}</div>
                                    }
                                }
                            })
                        }
                    </div>
                </div>
            </Modal>
            }
            {todaySignal===[] ? <Spin size="large" />  :
                <div
                    className="ag-theme-alpine"
                    style={{height:"100%",width:"100%"}}
                >
                    <AgGridReact
                        enableRtl={true}
                        rowSelection={'multiple'}
                        rowDragManaged={true}
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            resizable: true,
                        }}
                        rowData={todaySignal}
                        onRowClicked={(val)=>getSelectedRowData(val)}
                        rowStyle={{cursor:"pointer"}}
                    >
                        <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={100} rowDrag={true} headerName="زمان" field="time"/>
                        <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"center"}} width={140} headerName="تعداد سهام سیگنال شده" field="signalLength"/>
                        <AgGridColumn cellStyle={{border:"1px solid rgba(197, 197, 197, 0.521)",textAlign:"right"}} width={1600} headerName="نماد های سیگنال شده" field="namads"/>
                    </AgGridReact>
                </div>
            }
        </div>
    )
}
export default Signals;