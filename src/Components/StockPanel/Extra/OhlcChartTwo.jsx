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
          height: 350,
          toolbar: {
            export: {
              csv: {
                filename: "Etemadi",
              },
              svg: {
                filename: "Etemadi",
              },
              png: {
                filename: "Etemadi",
              }
            },
          },
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
          title: {
            text: "Etemadi",
            offsetY:0,
            offsetX:0,
          },
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