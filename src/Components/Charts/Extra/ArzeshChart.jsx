import React from 'react';
import ReactApexChart from 'react-apexcharts';
import FormatNumber from "../../../Helper/FormatNumber";


const ArzeshChart=({arzeshBuy,arzeshSale})=>{
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
          },
          dataLabels: {
            enabled: false
          },
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
            <ReactApexChart options={options} series={series} type="line" height={300} width={1250} />
        </div>
    )
}
export default ArzeshChart;