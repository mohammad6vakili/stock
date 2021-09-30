import React, { useEffect , useState} from 'react';
import Chart from "react-google-charts";
import { Spin } from 'antd';
import { useSelector ,  useDispatch} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Env from "../../../Constant/Env.json";
import { toast } from 'react-toastify';
import { setStockOhlc } from '../../../Store/Action';

const StockChart=()=>{
    const dispatch=useDispatch();
    const stockData=useSelector(state=>state.Reducer.stockData);
    const stockOhlc=useSelector(state=>state.Reducer.stockOhlc);
    const [chartData , setChartData]=useState([['day','open-close , high-low : ', 'High', 'Low', 'Close']]);
    const [dataHelper , setDataHelper]=useState([]);
    const [showChart , setShowChart]=useState(false);
    const stockOhlcReq=async()=>{
        try{
            const response=await axios.get(Env.baseURL + `/history?id=${stockData._id}`);
            dispatch(setStockOhlc(response.data))
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const generateChartData=async()=>{
        await stockOhlc.date.map((date,index)=>{
            if(index>0){
                chartData.push([moment(date).format('DD MMM, YYYY')]);
            }
        })
        await stockOhlc.open.map((open , index)=>{
            if(index>0){
                chartData[index].push(open);
            }
        })
        await stockOhlc.hight.map((high,index)=>{
            if(index>0){
                chartData[index].push(high);
            }
        })
        await stockOhlc.low.map((low,index)=>{
            if(index>0){
                chartData[index].push(low);
            }
        })
        stockOhlc.close.map((close,index)=>{
            if(index>0){
                chartData[index].push(close);
            }
        })
    }

    useEffect(()=>{
        stockOhlcReq();
        if(stockOhlc){
            generateChartData();
            let firstItem = chartData[0];
            let allLastItem= chartData.slice(chartData.length-90 , chartData.length);
            dataHelper.push(firstItem);
            allLastItem.map((data)=>{
                dataHelper.push(data)
            })
            setChartData(dataHelper);
        }
    },[])

    return(
        <>
                <Chart
                    width={'100%'}
                    height={250}
                    chartType="CandlestickChart"
                    loader={<Spin size="large"/>}
                    data={chartData}
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