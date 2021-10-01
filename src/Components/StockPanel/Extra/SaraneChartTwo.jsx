import React from 'react';
import Chart from 'react-apexcharts'

const SaraneChartTwo=({saraneDate,saraneOne,saraneTwo,saraneThree,saraneFour})=>{
    const series = [
        {name: 'سرانه خرید حقیقی',data: []},
        {name: 'سرانه خرید حقوقی ',data: saraneThree},
        {name: 'سرانه فروش حقیقی',data: saraneTwo},
        {name: 'سرانه فروش حقوقی ',data: saraneFour},
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
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 2
            },
          },
          xaxis: {
            categories: saraneDate
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