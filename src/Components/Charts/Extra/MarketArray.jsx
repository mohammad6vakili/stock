import React from 'react';
import ReactApexChart from 'react-apexcharts';


const MarketArray=({DataOne,DataTwo,DataThree,DataFour,DataFive})=>{
        const series= [
            {
                name: 'بیشتر از 3 درصد منفی',
                data: DataOne
            },
            {
                name: 'بین 0.5 تا 3 درصد منفی',
                data: DataTwo
            },
            {
                name: 'بین منفی 0.5 تا مثبت 0.5',
                data: DataThree
            },
            {
                name: 'بین 0.5 تا 3 درصد مثبت',
                data: DataFour
            },
            {
                name: 'بیش از 3 درصد مثبت',
                data: DataFive
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
          colors: ['#fc0307', '#fc8b8b', '#bedbad', '#00bd2b', '#45ff6f'],
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
        };
      

    return(
        <div className="charts-card">
            <div className="charts-card-header">نمودار وضعیت بازار</div>
            <ReactApexChart options={options} series={series} type="area" height={250} width={800} />
        </div>
    )
}
export default MarketArray;