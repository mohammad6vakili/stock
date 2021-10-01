import React from 'react';
import Chart from 'react-apexcharts'

const SaraneChartTwo=({saraneDate,hArzeshOne,hArzeshTwo,hArzeshThree,hArzeshFour})=>{
    const series = [
        {
          name: 'ارزش خرید حقیقی',data: hArzeshOne
        },
        {
          name: 'ارزش خرید حقوقی ',data: hArzeshTwo
        },
        {
          name: 'ارزش فروش حقیقی',data: hArzeshThree
        },
        {
          name: 'ارزش فروش حقوقی ',data: hArzeshFour
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
            categories: saraneDate
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
export default SaraneChartTwo;