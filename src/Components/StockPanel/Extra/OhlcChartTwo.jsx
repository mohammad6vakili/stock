import React from 'react';
import Chart from 'react-apexcharts'

const OhlcChartTwo=({data,ohlcDate})=>{
    const series = [{
        name: "Close",
        data: data
    }];
    const options = {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: 'Chart',
          align: 'left'
        },
        xaxis: {
          type: 'category',
          categories: ohlcDate,
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      };

    return(
      <Chart options={options} series={series} type="line" height={240} width={550} />
    )
}
export default OhlcChartTwo;