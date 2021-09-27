import React from 'react';
import "./StockPanel.css";
import { useSelector } from 'react-redux';


const OrderListTable=()=>{
    const stockData=useSelector(state=>state.Reducer.stockData);
    return(
        <>
            <table className="market-stock-panel-blue-table">
                <tbody>
                    <tr>
                        <th>تعداد</th>
                        <th>حجم</th>
                        <th>خرید</th>
                    </tr>
                    <tr>
                        <td>{stockData.r[1][1]}</td>
                        <td>{stockData.r[1][4].toLocaleString()}</td>
                        <td>{stockData.r[1][2].toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>{stockData.r[2][1]}</td>
                        <td>{stockData.r[2][4].toLocaleString()}</td>
                        <td>{stockData.r[2][2].toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>{stockData.r[3][1]}</td>
                        <td>{stockData.r[3][4].toLocaleString()}</td>
                        <td>{stockData.r[3][2].toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>{stockData.r[4][1]}</td>
                        <td>{stockData.r[4][4].toLocaleString()}</td>
                        <td>{stockData.r[4][2].toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>{stockData.r[5][1]}</td>
                        <td>{stockData.r[5][4].toLocaleString()}</td>
                        <td>{stockData.r[5][2].toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
            <table className="market-stock-panel-red-table">
                <tbody>
                    <tr>
                        <th>فروش</th>
                        <th>حجم</th>
                        <th>تعداد</th>
                    </tr>
                    <tr>
                        <td>{stockData.r[1][3].toLocaleString()}</td>
                        <td>{stockData.r[1][5].toLocaleString()}</td>
                        <td>{stockData.r[1][0]}</td>
                    </tr>
                    <tr>
                        <td>{stockData.r[2][3].toLocaleString()}</td>
                        <td>{stockData.r[2][5].toLocaleString()}</td>
                        <td>{stockData.r[2][0]}</td>
                    </tr>
                    <tr>
                        <td>{stockData.r[3][3].toLocaleString()}</td>
                        <td>{stockData.r[3][5].toLocaleString()}</td>
                        <td>{stockData.r[3][0]}</td>
                    </tr>
                    <tr>
                        <td>{stockData.r[4][3].toLocaleString()}</td>
                        <td>{stockData.r[4][5].toLocaleString()}</td>
                        <td>{stockData.r[4][0]}</td>
                    </tr>
                    <tr>
                        <td>{stockData.r[5][3].toLocaleString()}</td>
                        <td>{stockData.r[5][5].toLocaleString()}</td>
                        <td>{stockData.r[5][0]}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default OrderListTable;