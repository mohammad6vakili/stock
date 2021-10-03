import React from 'react';
import Chart from 'react-apexcharts'

const SaraneChartTwoT=({saraneDateT,hArzeshOneT,hArzeshTwoT,hArzeshThreeT,hArzeshFourT})=>{
    const series = [
        {
          name: 'ارزش خرید حقیقی',data: hArzeshOneT
        },
        {
          name: 'ارزش خرید حقوقی ',data: hArzeshTwoT
        },
        {
          name: 'ارزش فروش حقیقی',data: hArzeshThreeT
        },
        {
          name: 'ارزش فروش حقوقی ',data: hArzeshFourT
        },
    ];
    const options= {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          dataLabels: {
            enabled: false,
            },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 2
            },
          },
          xaxis: {
            categories: saraneDateT,
            labels: {
                offsetX: -2,
                offsetY: 25,
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
          legend: {
            position: 'bottom',
            offsetY: 4
          },
          fill: {
            opacity: 1
          }
      };

    return(
        <>
            <Chart options={options} series={series} type="bar" height={240} width={600} />
        </>
    )
}
export default SaraneChartTwoT;