import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ConfigProvider } from 'antd';
import 'moment/locale/fa';
import { DatePicker as DatePickerJalali } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";


const MarketQueue=({buyQueue,saleQueue,getMarketQueue,setSaleQueue,setBuyQueue})=>{
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
          },
          dataLabels: {
            enabled: false
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
              <div style={{marginRight:"20px"}}>
                {/* <ConfigProvider locale={fa_IR}  direction="rtl">
                  <DatePickerJalali 
                    style={{border:"none",width:"120px", borderBottom:"2px solid #91A0C1",borderRadius:"0"}}
                    onChange={(value)=>getDate(value)}
                  />
                </ConfigProvider> */}
              </div>
            </div>
            <ReactApexChart options={options} series={series} type="line" height={250} width={800} />
        </div>
    )
}
export default MarketQueue;