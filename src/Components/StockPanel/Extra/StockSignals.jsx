import React from 'react';
import { useSelector } from 'react-redux';
import "../StockPanel.css";

const StockSignals=()=>{
    const stockSignal=useSelector(state=>state.Reducer.stockSignal);
    return(
    <>
        {stockSignal &&
        <div className="stock-panel-signals">
            <div>
                <span>سرانه خرید حقیقی</span>
                <span>{stockSignal.S_bHa===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه خرید حقوقی</span>
                <span>{stockSignal.S_bHu===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه فروش حقیقی</span>
                <span>{stockSignal.S_sHa===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه فروش حقوقی</span>
                <span>{stockSignal.S_sHu===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه خرید کل بازار</span>
                <span>{stockSignal.SaraneB===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه فروش کل بازار</span>
                <span>{stockSignal.SaraneS===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه دلاری خرید حقیقی</span>
                <span>{stockSignal.USD_S_bHa===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه دلاری خرید حقوقی</span>
                <span>{stockSignal.USD_S_bHu===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه دلاری فروش حقیقی</span>
                <span>{stockSignal.USD_S_sHa===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه دلاری فروش حقوقی</span>
                <span>{stockSignal.USD_S_sHu===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه دلاری خرید کل بازار</span>
                <span>{stockSignal.USD_SaraneB===true ? "✔" : "---"}</span>
            </div>
            <div>
                <span>سرانه دلاری فروش کل بازار</span>
                <span>{stockSignal.USD_SaraneS===true ? "✔" : "---"}</span>
            </div>
        </div>
        }
    </>
    )
}
export default StockSignals;