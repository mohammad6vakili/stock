import React,{useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import { ConfigProvider } from 'antd';
import 'moment/locale/fa';
import { DatePicker as DatePickerJalali } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";


const MarketQueue=({buyQueue,saleQueue,getMarketQueue,setSaleQueue,setBuyQueue})=>{
        const [zOut , setZOut]=useState(true);
        const series= [
            {
                name: "تعداد صف های خرید",
                data: buyQueue
            },
            {
                name: "تعداد صف های فروش",
                data: saleQueue
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
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: {
            horizontal: 5,
            vertical:20
            }
          },
          colors:['#0022ff','#ff0019'],
          stroke: {
            curve: 'smooth'
          },
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
              },
          },
        };
        const getDate=(value)=>{
          getMarketQueue(value.$y.toString() + ("0" + (value.$M+1).toString()).slice(-2) + ("0" + (value.$D).toString()).slice(-2))
        }

    return(
        <div className="charts-card">
            <div className="charts-card-header">
              <span>نمودار تغییرات تعداد صف ها</span>
            </div>
            <ReactApexChart options={options} series={series} type="line" height={300} width={800} />
        </div>
    )
}
export default MarketQueue;