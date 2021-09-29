import React from 'react';
import "../StockPanel.css";
import {VictoryChart,VictoryTheme,VictoryAxis,VictoryCandlestick} from "victory";

const StockChart=()=>{
    const chartData=[
        {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
        {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
        {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
        {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
        {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 6), open: 5, close: 10, high: 15, low: 0},
        {x: new Date(2016, 6, 7), open: 10, close: 15, high: 20, low: 5},
        {x: new Date(2016, 6, 8), open: 15, close: 20, high: 22, low: 10},
        {x: new Date(2016, 6, 9), open: 20, close: 10, high: 25, low: 7},
        {x: new Date(2016, 6, 10), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 11), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 12), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 13), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 14), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 15), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 16), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 17), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 18), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 19), open: 10, close: 8, high: 15, low: 5},
        {x: new Date(2016, 6, 20), open: 10, close: 8, high: 15, low: 5},
    ];
    return(
        <>
            <VictoryChart
                height={200}
                style={{width:"unset"}}
                theme={VictoryTheme.material}
                domainPadding={{ x: 25 }}
                scale={{ x: "time" }}
            >
            <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
            <VictoryAxis dependentAxis/>
            <VictoryCandlestick
                // height={200}
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                data={chartData}
            />
            </VictoryChart>
        </>
    )
}
export default StockChart;