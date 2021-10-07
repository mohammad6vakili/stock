import React from 'react';
import "../StockPanel.css";
import ReactApexChart from 'react-apexcharts';

const EnterMoneyChart=()=>{
    return(
        <>
            <ReactApexChart options={options} series={series} type="line" height={300} width={1250} />
        </>
    )
}
export default EnterMoneyChart;