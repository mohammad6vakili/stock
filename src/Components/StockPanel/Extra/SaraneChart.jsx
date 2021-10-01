import React from 'react';
import Chart from 'react-apexcharts'

const SaraneChart=({saraneDate,saraneOne,saraneTwo,saraneThree,saraneFour})=>{
    const series = [
        {name: 'سرانه خرید حقیقی',data: []},
        {name: 'سرانه خرید حقوقی ',data: saraneThree},
        {name: 'سرانه فروش حقیقی',data: saraneTwo},
        {name: 'سرانه فروش حقوقی ',data: saraneFour},
    ];
    const options= {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 1,
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
        <>
            <Chart options={options} series={series} type="bar" height={240} width={600} />
        </>
    )
}
export default SaraneChart;