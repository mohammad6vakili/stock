import React,{useEffect} from 'react';
import "./Market.css";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { useDispatch , useSelector} from 'react-redux';
import { setMarketData } from '../../Store/Action';
import { Spin } from 'antd';


const MarketTablo=()=>{
    
    const dispatch=useDispatch();
    const marketData=useSelector(state=>state.Reducer.marketData);
    
    useEffect(()=>{
        getMarketData();
    },[])

    const getMarketData=async()=>{
        try{
            const response=await axios.get(Env.baseURL + "/market");
            dispatch(setMarketData(response.data.data));
            response.data.data.map((data)=>{console.log(data)});
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="market">
            {!marketData ? <Spin size="large" /> :
            <>
                <div
                    className="ag-theme-alpine"
                    style={{height:"100%",width:"85%"}}
                >
                              <AgGridReact
                                enableRtl={true}
                                rowDragManaged={true}
                                defaultColDef={{
                                    // editable: true,
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
                                rowData={marketData}
                            >
                                <AgGridColumn width={110} cellStyle={{cursor:"pointer"}} rowDrag={true} headerName="نماد" field="Namad"/>
                                <AgGridColumn width={180} headerName="نام" field="Name"/>
                                <AgGridColumn width={50} headerName="تعداد" field="Tedad" type="numberColumn"/>
                                <AgGridColumn width={70} headerName="حجم" field="Hajm" type="numberColumn"/>
                                <AgGridColumn width={100} headerName="ارزش" field="Arzesh" type="numberColumn"/>
                                <AgGridColumn width={60} headerName="دیروز" field="Yesterday" type="numberColumn"/>
                                <AgGridColumn width={60} headerName="Clock" field="Clock" type="numberColumn"/>
                                <AgGridColumn width={55} headerName="Close" field="Close" type="numberColumn"/>
                                <AgGridColumn width={100} headerName="کد" field="Code" type="numberColumn"/>
                                <AgGridColumn width={55} headerName="کدبازار" field="CodeBazar" type="numberColumn"/>
                                <AgGridColumn width={65} headerName="کد گروه" field="CodeGroup" type="numberColumn"/>
                                <AgGridColumn width={50} headerName="EPS" field="EPS" type="numberColumn"/>
                                <AgGridColumn width={60} headerName="Fild16" field="Fild16" type="numberColumn"/>
                                <AgGridColumn width={70} headerName="حدمجازD" field="HadeMojazD" type="numberColumn"/>
                                <AgGridColumn width={70} headerName="حدمجازU" field="HadeMojazU" type="numberColumn"/>
                                <AgGridColumn width={70} headerName="حجم مبنا" field="HajmMabna" type="numberColumn"/>
                                <AgGridColumn width={60} headerName="High" field="High" type="numberColumn"/>
                                <AgGridColumn width={60} headerName="Low" field="Low" type="numberColumn"/>
                                <AgGridColumn width={60} headerName="Open" field="Open" type="numberColumn"/>
                                <AgGridColumn width={60} headerName="پایانی" field="Payani" type="numberColumn"/>
                                <AgGridColumn width={90} headerName="تعداد سهم" field="TedadSaham" type="numberColumn"/>
                                <AgGridColumn width={65} headerName="branch" field="branch" type="numberColumn"/>
                                <AgGridColumn width={60} headerName="queue" field="queue" type="numberColumn"/>
                            </AgGridReact>
                </div>
                <div className="market-mini-tablo">sss</div>
                </>
            }
        </div>
    )
}
export default MarketTablo;