import React from 'react';
import Chart from 'react-apexcharts';
import * as moment from 'jalali-moment';


const SaraneChart=({saraneDate,saraneOne,saraneTwo,saraneThree,saraneFour})=>{
    const series = [
        {name: 'سرانه خرید حقیقی',data: saraneOne},
        {name: 'سرانه خرید حقوقی ',data: saraneThree},
        {name: 'سرانه فروش حقیقی',data: saraneTwo},
        {name: 'سرانه فروش حقوقی ',data: saraneFour},
    ];
    const options= {
        chart: {
          type: 'bar',
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
          categories: saraneDate.map((data)=>{
            return moment(data.toString()).locale('fa').format('YYYY/M/D')
          }),
          tickPlacement: 'on'
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