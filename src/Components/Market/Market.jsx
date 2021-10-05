import React,{useEffect, useState} from 'react';
import "./Market.css";
import FormatNumber from "../../Helper/FormatNumber";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { useDispatch , useSelector} from 'react-redux';
import { setMarketData , setSidePanel, setStockData} from '../../Store/Action';
import { Spin } from 'antd';
import { useHistory } from 'react-router';


const MarketTablo=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const marketData=useSelector(state=>state.Reducer.marketData);
    const sidePanel=useSelector(state=>state.Reducer.sidePanel);
    const [tableData , setTableData]=useState(null);

    const getSelectedRowData = (val) => {
        dispatch(setSidePanel((val.data)));
    }
    const getStockDataHandler=(val)=>{
        dispatch(setStockData(val.data));
        history.push("/stock-panel");
    } 
    
    useEffect(()=>{
        setTableData(marketData);
        if(tableData){
            tableData.map((data)=>{
                data.Hajm=FormatNumber(JSON.parse(data.Hajm))
            })
        }
    },[marketData])

        return(
        <div className="market">
            {!tableData ? <Spin size="large" /> :
            <>
                <div
                    className="ag-theme-alpine"
                    style={{height:"100%",width:"78%"}}
                >
                              <AgGridReact
                                enableRtl={true}
                                rowSelection={'single'}
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
                                rowData={tableData}
                                onRowClicked={(val)=>getSelectedRowData(val)}
                                onRowDoubleClicked={(val)=>getStockDataHandler(val)}
                                rowStyle={{cursor:"pointer"}}
                            >
                                <AgGridColumn width={115} rowDrag={true} cellClass="market-table-cell-link-hover" headerName="نماد" field="Namad"/>
                                <AgGridColumn cellClass="market-table-cell-link-hover" width={190} headerName="نام" field="Name"/>
                                <AgGridColumn width={60} headerName="تعداد" field="Tedad" type="numberColumn"/>
                                <AgGridColumn width={80} headerName="حجم" field="Hajm" type="numberColumn"/>
                                <AgGridColumn width={100} headerName="ارزش" field="Arzesh" type="numberColumn"/>
                                <AgGridColumn width={70} headerName="دیروز" field="Yesterday" type="numberColumn"/>
                                {/* <AgGridColumn width={60} headerName="Clock" field="Clock" type="numberColumn"/> */}
                                <AgGridColumn width={90} headerName="آخرین معامله" field="Close" type="numberColumn"/>
                                {/* <AgGridColumn width={100} headerName="کد" field="Code" type="numberColumn"/> */}
                                {/* <AgGridColumn width={55} headerName="کدبازار" field="CodeBazar" type="numberColumn"/> */}
                                {/* <AgGridColumn width={65} headerName="کد گروه" field="CodeGroup" type="numberColumn"/> */}
                                <AgGridColumn width={50} headerName="EPS" field="EPS" type="numberColumn"/>
                                {/* <AgGridColumn width={60} headerName="Fild16" field="Fild16" type="numberColumn"/> */}
                                {/* <AgGridColumn width={70} headerName="قیمت مجاز بالا" field="HadeMojazD" type="numberColumn"/> */}
                                {/* <AgGridColumn width={70} headerName="قیمت مجاز پایین" field="HadeMojazU" type="numberColumn"/> */}
                                <AgGridColumn width={80} headerName="حجم مبنا" field="HajmMabna" type="numberColumn"/>
                                <AgGridColumn width={70} headerName="بیشترین " field="High" type="numberColumn"/>
                                <AgGridColumn width={70} headerName="کمترین" field="Low" type="numberColumn"/>
                                <AgGridColumn width={90} headerName="اولین معامله" field="Open" type="numberColumn"/>
                                <AgGridColumn width={70} headerName="پایانی" field="Payani" type="numberColumn"/>
                                {/* <AgGridColumn width={90} headerName="تعداد سهم" field="TedadSaham" type="numberColumn"/> */}
                                {/* <AgGridColumn width={65} headerName="branch" field="branch" type="numberColumn"/> */}
                                {/* <AgGridColumn width={90} headerName="وضعیت صف" field="queue" type="numberColumn"/> */}
                                {/* queue ==> 1:kharid , -1:forosh , 0:no queue*/}
                            </AgGridReact>
                </div>
                <div className="market-mini-panel-wrapper">
                    <div className="market-mini-panel-title">اطلاعات نماد</div>
                    {sidePanel ?
                        <div className="market-mini-panel">
                            <div style={{width:"100%",textAlign:"right",fontWeight:700}}>{sidePanel.Namad} - {sidePanel.Name}</div>
                            <div className="market-mini-panel-data">
                                <div>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>آخرین معامله</span><span>{JSON.parse(sidePanel.Close).toLocaleString()}</span>
                                    </div>
                                    <span style={sidePanel.Close - sidePanel.Yesterday>0?{color:"green",marginRight:"20px"}:{color:"red",marginRight:"20px"}}>{sidePanel.Close - sidePanel.Yesterday}</span>
                                </div>
                                <div>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>قیمت پایانی</span><span>{JSON.parse(sidePanel.Payani).toLocaleString()}</span>
                                    </div>
                                    <span style={sidePanel.Payani - sidePanel.Yesterday>0?{color:"green",marginRight:"20px"}:{color:"red",marginRight:"20px"}}>{sidePanel.Payani - sidePanel.Yesterday}</span>
                                </div>
                                <div>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>قیمت دیروز</span><span>{JSON.parse(sidePanel.Yesterday).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>قیمت اولین</span><span>{JSON.parse(sidePanel.Open).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>بازه روز</span><span>{JSON.parse(sidePanel.Low).toLocaleString()} - {JSON.parse(sidePanel.High).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div style={{borderBottom:"1px solid #D7D7D7",paddingBottom:"5px"}}>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>قیمت مجاز</span><span>{JSON.parse(sidePanel.HadeMojazD).toLocaleString()} - {JSON.parse(sidePanel.HadeMojazU).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div style={{justifyContent:"space-between",paddingTop:"5px"}}>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>تعداد</span><span>{JSON.parse(sidePanel.Tedad).toLocaleString()}</span>
                                    </div>
                                    <div style={{width:"40%",display:"flex",justifyContent:"space-between"}}>
                                        <span>ارزش</span><span>{FormatNumber(sidePanel.Arzesh)}</span>
                                    </div>
                                </div>
                                <div style={{justifyContent:"space-between",borderBottom:"1px solid #D7D7D7",paddingBottom:"5px"}}>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>حجم</span><span>{FormatNumber(sidePanel.Hajm)}</span>
                                    </div>
                                    <div style={{width:"40%",display:"flex",justifyContent:"space-between"}}>
                                        <span>حجم مبنا</span><span>{FormatNumber(sidePanel.HajmMabna)}</span>
                                    </div>
                                </div>
                                <div style={{borderBottom:"1px solid #D7D7D7",paddingTop:"5px"}}>
                                    <div style={{width:"50%",display:"flex",justifyContent:"space-between"}}>
                                        <span>EPS</span><span>{sidePanel.EPS}</span>
                                    </div>
                                </div>
                                <div style={{paddingTop:"10px",justifyContent:"space-around"}}>
                                    <table className="market-side-panel-blue-table">
                                        <tbody>
                                            <tr>
                                                <th>تعداد</th>
                                                <th>حجم</th>
                                                <th>قیمت</th>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[1][1]}</td>
                                                <td>{sidePanel.r[1][4].toLocaleString()}</td>
                                                <td>{sidePanel.r[1][2]}</td>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[2][1]}</td>
                                                <td>{sidePanel.r[2][4].toLocaleString()}</td>
                                                <td>{sidePanel.r[2][2]}</td>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[3][1]}</td>
                                                <td>{sidePanel.r[3][4].toLocaleString()}</td>
                                                <td>{sidePanel.r[3][2]}</td>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[4][1]}</td>
                                                <td>{sidePanel.r[4][4].toLocaleString()}</td>
                                                <td>{sidePanel.r[4][2]}</td>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[5][1]}</td>
                                                <td>{sidePanel.r[5][4].toLocaleString()}</td>
                                                <td>{sidePanel.r[5][2]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="market-side-panel-red-table">
                                        <tbody>
                                            <tr>
                                                <th>قیمت</th>
                                                <th>حجم</th>
                                                <th>تعداد</th>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[1][3]}</td>
                                                <td>{sidePanel.r[1][5].toLocaleString()}</td>
                                                <td>{sidePanel.r[1][0]}</td>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[2][3]}</td>
                                                <td>{sidePanel.r[2][5].toLocaleString()}</td>
                                                <td>{sidePanel.r[2][0]}</td>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[3][3]}</td>
                                                <td>{sidePanel.r[3][5].toLocaleString()}</td>
                                                <td>{sidePanel.r[3][0]}</td>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[4][3]}</td>
                                                <td>{sidePanel.r[4][5].toLocaleString()}</td>
                                                <td>{sidePanel.r[4][0]}</td>
                                            </tr>
                                            <tr>
                                                <td>{sidePanel.r[5][3]}</td>
                                                <td>{sidePanel.r[5][5].toLocaleString()}</td>
                                                <td>{sidePanel.r[5][0]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    :    
                        <div>نماد مورد نظر را انتخاب کنید</div>
                    }
                </div>
                </>
            }
        </div>
    )
}
export default MarketTablo;