import React from 'react';
import Chart from 'react-apexcharts'

const SaraneChart=({saraneDate,saraneOne,saraneTwo,saraneThree,saraneFour})=>{
    const series = [{
            name: 'سرانه خرید حقیقی',
            data: saraneOne
          }, {
            name: 'سرانه فروش حقیقی',
            data: saraneOne
          }, {
            name: 'سرانه خرید حقوقی ',
            data: saraneOne
          }, {
            name: 'سرانه فروش حقوقی ',
            data: saraneOne
        }];
    const options= {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: saraneDate,
        },
        yaxis: {
          title: {
            text: ''
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                  return val
                }
            }
        }
      };

    return(
      <Chart options={options} series={series} type="bar" height={240} width={550} />
    )
}
export default SaraneChart;