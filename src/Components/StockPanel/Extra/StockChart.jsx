import React from 'react';
import Chart from "react-google-charts";
import { Spin } from 'antd';

const StockChart=()=>{
    return(
        <>
            <Chart
                width={'100%'}
                height={250}
                chartType="CandlestickChart"
                loader={<Spin size="large"/>}
                data={[
                    ['day', 'a', 'b', 'c', 'd'],
                    ['Mon', 20, 28, 38, 45],
                    ['Tue', 31, 38, 55, 66],
                    ['Wed', 50, 55, 77, 80],
                    ['Thu', 77, 77, 66, 50],
                    ['Fri', 68, 66, 22, 15],
                ]}
                options={{
                    legend: 'none',
                    candlestick: {
                        fallingColor: { strokeWidth: 1, fill: '#a52714' }, // red
                        risingColor: { strokeWidth: 1, fill: '#0f9d58' }, // green
                      },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </>
    )
}
export default StockChart;