import React from 'react';
import "./StockPanel.css";
import { useSelector } from 'react-redux';


const SotckPanel=()=>{
    
    const stockData=useSelector(state=>state.Reducer.stockData);

    return(
        <div className="stock-panel-wrapper">
            <div className="stock-panel">
                <div className="stock-panel-header">{stockData.Name}({stockData.Namad})</div>
                <div>Arzesh : {stockData.Arzesh}</div>
                <div>Clock : {stockData.Clock}</div>
                <div>Close : {stockData.Close}</div>
                <div>Code : {stockData.Code}</div>
                <div>CodeBazar : {stockData.CodeBazar}</div>
                <div>CodeGroup : {stockData.CodeGroup}</div>
                <div>EPS : {stockData.EPS}</div>
                <div>Fild16 : {stockData.Fild16}</div>
                <div>HadeMojazD : {stockData.HadeMojazD}</div>
                <div>HadeMojazU : {stockData.HadeMojazU}</div>
                <div>Hajm : {stockData.Hajm}</div>
                <div>HajmMabna : {stockData.HajmMabna}</div>
                <div>High : {stockData.High}</div>
                <div>Low : {stockData.Low}</div>
                <div>Open : {stockData.Open}</div>
                <div>Payani : {stockData.Payani}</div>
                <div>Tedad : {stockData.Tedad}</div>
                <div>TedadSaham : {stockData.TedadSaham}</div>
                <div>Yesterday : {stockData.Yesterday}</div>
                <div>branch : {stockData.branch}</div>
                <div>queue : {stockData.queue}</div>
            </div>
        </div>
    )
}
export default SotckPanel;