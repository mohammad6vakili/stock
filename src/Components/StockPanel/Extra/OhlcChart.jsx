import React from 'react';
import Chart from 'react-apexcharts'

const OhlcChart=({data})=>{
    const series = [{
            data
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
          type: 'category'
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
      <Chart options={options} series={series} type="candlestick" height={240} width={550} />
    )
}
export default OhlcChart;