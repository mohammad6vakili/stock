import React,{useState} from 'react';
import "../StockPanel.css";
import ReactApexChart from 'react-apexcharts';

const EnterMoneyChart=({enterMoney})=>{
    const [zOut , setZOut]=useState(true);
    const series= [
        {
            name: "ارزش صف های خرید",
            data: enterMoney
        }    
    ];
    const options= {
      chart: {
        type: 'line',
        height: 300,
        dataLabels: {
          enabled: false
        },
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
      stroke: {
        curve: 'smooth'
      },
        colors: ['#969493'],
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
        if(num>0){
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
          }else{
            num = Math.abs(Number(num))
            const billions = num/1.0e+9
            const millions = num/1.0e+6
              return num >= 1.0e+9 && billions >= 100  ? Math.round(-billions)  + "B"
                 : num >= 1.0e+9 && billions >= 10   ? -billions.toFixed(1)   + "B"
                 : num >= 1.0e+9                     ? -billions.toFixed(2)   + "B"
                 : num >= 1.0e+6 && millions >= 100  ? Math.round(-millions)  + "M"
                 : num >= 1.0e+6 && millions >= 10   ? -millions.toFixed(1)   + "M"
                 : num >= 1.0e+6                     ? -millions.toFixed(2)   + "M"
                 : num.toFixed(2)
          }
        }
          },
      },
    };

    return(
        <>
            <ReactApexChart options={options} series={series} type="line" height={300} width={1150} />
        </>
    )
}
export default EnterMoneyChart;