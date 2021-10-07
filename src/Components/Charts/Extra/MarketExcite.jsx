import React from 'react';
import ReactApexChart from 'react-apexcharts';


const MarketExcite=({exOne,exTwo,exThree,exFour,exFive,exSix,exSeven,exEight,exNine,exTen})=>{
        const series= [
            {
                name:"1",
                // name: 'بیشتر از 3 درصد منفی',
                data: exOne
            },
            {
                name:"2",
                // name: 'بین 0.5 تا 3 درصد منفی',
                data: exTwo
            },
            {
                name:"3",
                // name: 'بین منفی 0.5 تا مثبت 0.5',
                data: exThree
            },
            {
                name:"4",
                // name: 'بین 0.5 تا 3 درصد مثبت',
                data: exFour
            },
            {
                name:"5",
                // name: 'بیش از 3 درصد مثبت',
                data: exFive
            },
            {
                name:"6",
                // name: 'بیش از 3 درصد مثبت',
                data: exSix
            },
            {
                name:"7",
                // name: 'بیش از 3 درصد مثبت',
                data: exSeven
            },
            {
                name:"8",
                // name: 'بیش از 3 درصد مثبت',
                data: exEight
            },
            {
                name:"9",
                // name: 'بیش از 3 درصد مثبت',
                data: exNine
            },
            {
                name:"10",
                // name: 'بیش از 3 درصد مثبت',
                data: exTen
            },
        ];
        const options= {
          chart: {
            type: 'area',
            height: 350,
            stacked: true,
            stackType: '100%',
            events: {
              selection: function (chart, e) {
                console.log(new Date(e.xaxis.min))
              }
            },
          },
          colors: ['#00631b', '#00a12b', '#00d93a', '#1cff59', '#b2bf7e', '#ff5959', '#ff1c1c', '#ff0000', '#d60000', '#960000',],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.6,
              opacityTo: 0.8,
            }
          },
          legend: {
            show:'false',
            markers:{
                width:0
            },
            labels:{
                colors:'white'
            },
            position: 'bottom',
            horizontalAlign: 'center'
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
            min:0,
            max:660,
            labels: {
                show: true,
                align: 'center',
            }
          },
            tooltip:{
                enabled:false
            },
        };
      

    return(
        <div className="charts-card">
            <div className="charts-card-header">نمودار هیجان بازار</div>
            <ReactApexChart options={options} series={series} type="area" height={250} width={800} />
        </div>
    )
}
export default MarketExcite;