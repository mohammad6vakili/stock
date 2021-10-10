import React from 'react';
import Chart from 'react-apexcharts';
import * as moment from 'jalali-moment';


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
            categories: saraneDate.map((data)=>{
              return moment(data.toString()).locale('fa').format('YYYY/M/D')
            }),
            tickPlacement: 'on'
          },
          yaxis: {
            show: true,
            labels: {
                show: true,
                align: 'center',
                formatter:function(num) {
                  num = Math.abs(Number(num))
                  const billions = num/1.0e+9
                  const millions = num/1.0e+6
                    return num >= 1.0e+9 && billions >= 100  ? Math.round(billions)  + "B"
                       : num >= 1.0e+9 && billions >= 10   ? billions.toFixed(1)   + "B"
                       : num >= 1.0e+9                     ? billions.toFixed(2)   + "B"
                       : num >= 1.0e+6 && millions >= 100  ? Math.round(millions)  + "M"
                       : num >= 1.0e+6 && millions >= 10   ? millions.toFixed(1)   + "M"
                       : num >= 1.0e+6                     ? millions.toFixed(2)   + "M"
                       : num.toFixed(2)
                }
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