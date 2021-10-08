import React from 'react';
import Chart from 'react-apexcharts';
import * as moment from 'jalali-moment';


const OhlcChartTwo=({closeData,ohlcDate})=>{
    const series = [{
        name: "Close",
        data: closeData
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
          categories: ohlcDate.map((data)=>{
            return moment(data.toString()).locale('fa').format('YYYY/M/D')
          }),
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
      <Chart options={options} series={series} type="line" height={240} width={550} />
    )
}
export default OhlcChartTwo;