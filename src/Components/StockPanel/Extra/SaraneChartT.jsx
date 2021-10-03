import React from 'react';
import Chart from 'react-apexcharts'

const SaraneChartT=({saraneDateT,saraneOneT,saraneTwoT,saraneThreeT,saraneFourT})=>{
    const series = [
        {name: 'سرانه خرید حقیقی',data: []},
        {name: 'سرانه خرید حقوقی ',data: saraneThreeT},
        {name: 'سرانه فروش حقیقی',data: saraneTwoT},
        {name: 'سرانه فروش حقوقی ',data: saraneFourT},
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
          categories: saraneDateT,
          labels: {
            offsetX: -2,
            offsetY: 30,
              rotate: -90,
              style: {
                fontSize: '11px',
              },
        }
        },
        yaxis: {
          show: true,
          labels: {
              show: true,
              align: 'center',
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
export default SaraneChartT;