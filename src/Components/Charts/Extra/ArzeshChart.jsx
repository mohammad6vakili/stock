import React,{useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import FormatNumber from "../../../Helper/FormatNumber";


const ArzeshChart=({arzeshBuy,arzeshSale})=>{
        const [zOut , setZOut]=useState(true);
        const series= [
            {
                name: "ارزش صف های خرید",
                data: arzeshBuy
            },
            {
                name: "ارزش صف های فروش",
                data: arzeshSale
            }
        ];
        const options= {
          chart: {
            type: 'line',
            height: 300,
            events: {
              selection: function (chart, e) {
                console.log(new Date(e.xaxis.min))
              },
              beforeZoom : (e, {xaxis}) => {
                if(xaxis.min <20000){
                  setZOut(false)
                }else if(xaxis.min > 20000){
                  setZOut(true)
                }
              }
            },
            toolbar: {
              tools: {
                zoomout: zOut,
              },
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
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: {
            horizontal: 5,
            vertical:20
            }
          },
          colors:['#0022ff','#ff0019'],
          xaxis: {
            type: 'dataTime',
            labels: {
                show: true,
                align: 0,
                rotate:-90,
                offsetX: 0,
                offsetY: 25,
                formatter: function(secs){
                    var sec_num = parseInt(secs, 10)
                    var hours   = Math.floor(sec_num / 3600)
                    var minutes = Math.floor(sec_num / 60) % 60
                
                    return [hours,minutes]
                        .map(v => v < 10 ? "0" + v : v)
                        .filter((v,i) => v !== "00" || i > 0)
                        .join(":")
                }
            },
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
              },
          },
        };
      

    return(
        <div className="charts-card">
            <div className="charts-card-header">نمودار ارزش بازار</div>
            <ReactApexChart options={options} series={series} type="line" height={300} width={800} />
        </div>
    )
}
export default ArzeshChart;