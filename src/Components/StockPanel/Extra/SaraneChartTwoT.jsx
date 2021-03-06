import React from 'react';
import Chart from 'react-apexcharts';
import Images from "../../../Assets/images/background.jpg";

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
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 1300,
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
            tickPlacement: 'on',
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
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: {
            horizontal: 5,
            vertical:15
            }
          },
          fill: {
            opacity: 1
          }
      };

    return(
        <>
            <Chart options={options} series={series} type="bar" height={300} width={1150} />
        </>
    )
}
export default SaraneChartTwoT;