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
                <div
                    className="ag-theme-alpine"
                    style={{height:"100%",width:"98%"}}
                >
                              <AgGridReact
                                enableRtl={true}
                                rowDragManaged={true}
                                defaultColDef={{
                                    editable: true,
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
                                <AgGridColumn rowDrag={true} headerName="نماد" field="Namad"/>
                                <AgGridColumn headerName="نام" field="Name"/>
                                <AgGridColumn headerName="Age" field="age" type="numberColumn"/>
                                <AgGridColumn headerName="Year" field="year" type="numberColumn"/>
                            </AgGridReact>
                    {/* <AgGridReact     
                    enableRtl={true}
                    defaultColDef={{ resizable: true }}
                    defaultColDef={{
                        editable: true,
                        sortable: true,
                        filter: true,
                        resizable: true,
                    }}
                    // frameworkComponents={{

                    // }}
                        getRowHeight={30}
                        rowData={marketData}
                    >
                            <AgGridColumn field={}></AgGridColumn>
                    </AgGridReact> */}
                </div>
            }
        </div>
    )
}
export default MarketTablo;