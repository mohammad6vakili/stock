import React from 'react';
import Chart from 'react-apexcharts'

const OhlcChart=({data})=>{
    const series = [{
            data
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
          // type: 'datetime'
        },
        yaxis: {
          show: true,
          labels: {
              show: true,
              align: 'center',
          }
        },
      };

    return(
      <Chart options={options} series={series} type="candlestick" height={240} width={550} />
    )
}
export default OhlcChart;