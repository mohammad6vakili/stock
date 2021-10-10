import React, { useEffect, useState } from 'react';
import "./Charts.css";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import MarketArray from './Extra/MarketArray';
import MarketExcite from './Extra/MarketExcite';
import ArzeshChart from "./Extra/ArzeshChart";
import MarketQueue from './Extra/MarketQueue';

const Charts =()=>{
    const [DataOne , setDataOne]=useState([]);
    const [DataTwo , setDataTwo]=useState([]);
    const [DataThree , setDataThree]=useState([]);
    const [DataFour , setDataFour]=useState([]);
    const [DataFive , setDataFive]=useState([]);

    const [exOne , setExOne]=useState([]);
    const [exTwo , setExTwo]=useState([]);
    const [exThree , setExThree]=useState([]);
    const [exFour , setExFour]=useState([]);
    const [exFive , setExFive]=useState([]);
    const [exSix , setExSix]=useState([]);
    const [exSeven , setExSeven]=useState([]);
    const [exEight , setExEight]=useState([]);
    const [exNine , setExNine]=useState([]);
    const [exTen , setExTen]=useState([]);

    const [arzeshBuy , setArzeshBuy]=useState([]);
    const [arzeshSale , setArzeshSale]=useState([]);

    const [buyQueue , setBuyQueue]=useState([]);
    const [saleQueue , setSaleQueue]=useState([]);

    const getMarketArray=async()=>{
        try{
            const response = await axios.get(Env.baseURL + "/marketarray");
            for (let index=0;index<Object.keys(response.data).length;index++) {
                DataOne.push([Object.keys(response.data)[index],Object.values(response.data)[index][0]]);
                DataTwo.push([Object.keys(response.data)[index],Object.values(response.data)[index][1]]);
                DataThree.push([Object.keys(response.data)[index],Object.values(response.data)[index][2]]);
                DataFour.push([Object.keys(response.data)[index],Object.values(response.data)[index][3]]);
                DataFive.push([Object.keys(response.data)[index],Object.values(response.data)[index][4]]);
            }
            setDataOne(DataOne.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/10];
            }))
            setDataTwo(DataTwo.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/10];
            }))
            setDataThree(DataThree.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/10];
            }))
            setDataFour(DataFour.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/10];
            }))
            setDataFive(DataFive.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/10];
            }))
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const getMarketExcite=async()=>{
        try{
            const response=await axios.get(Env.baseURL + "/excite");
            for (let index=0;index<Object.keys(response.data).length;index++) {
                exOne.push([Object.keys(response.data)[index],Object.values(response.data)[index][0]]);
                exTwo.push([Object.keys(response.data)[index],Object.values(response.data)[index][1]]);
                exThree.push([Object.keys(response.data)[index],Object.values(response.data)[index][2]]);
                exFour.push([Object.keys(response.data)[index],Object.values(response.data)[index][3]]);
                exFive.push([Object.keys(response.data)[index],Object.values(response.data)[index][4]]);
                exSix.push([Object.keys(response.data)[index],Object.values(response.data)[index][5]]);
                exSeven.push([Object.keys(response.data)[index],Object.values(response.data)[index][6]]);
                exEight.push([Object.keys(response.data)[index],Object.values(response.data)[index][7]]);
                exNine.push([Object.keys(response.data)[index],Object.values(response.data)[index][8]]);
                exTen.push([Object.keys(response.data)[index],Object.values(response.data)[index][9]]);
            }
            setExOne(exOne.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExTwo(exTwo.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExThree(exThree.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExFour(exFour.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExFive(exFive.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExSix(exSix.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExSeven(exSeven.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExEight(exEight.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExNine(exNine.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
            setExTen(exTen.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]/20];
            }))
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }
    
    const getMarketArzesh=async()=>{
        try{
            const response=await axios.get(Env.baseURL + "/arzesh");
            for (let index=0;index<Object.keys(response.data).length;index++) {
                arzeshBuy.push([Object.keys(response.data)[index],Object.values(response.data)[index][1][1]]);
                arzeshSale.push([Object.keys(response.data)[index],Object.values(response.data)[index][0][1]]);
            }
            setArzeshBuy(arzeshBuy.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]];
            }))
            setArzeshSale(arzeshSale.map((data)=>{
                return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60) + parseInt(data[0].split(":")[2], 10),data[1]];
            }))
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    const getMarketQueue=async(date)=>{
        try{
            if(date){
                const response=await axios.get(Env.baseURL + `/filterstore?date=${date}`);
                console.log(response.data);
                response.data.time.map((data,index)=>{
                    buyQueue.push([data,response.data.BuyQueue.count[index]]);
                    saleQueue.push([data,response.data.SellQueue.count[index]]);
                })
                setBuyQueue(buyQueue.map((data)=>{
                    return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60),data[1]];
                }))
                setSaleQueue(saleQueue.map((data)=>{
                    return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60),data[1]];
                }))    
            }else{
                const response=await axios.get(Env.baseURL + "/filter?id=series");
                console.log(response.data);
                setBuyQueue([]);
                setSaleQueue([]);
                response.data.time.map((data,index)=>{
                    buyQueue.push([data,response.data.BuyQueue.count[index]]);
                    saleQueue.push([data,response.data.SellQueue.count[index]]);
                })
                setBuyQueue(buyQueue.map((data)=>{
                    return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60),data[1]];
                }))
                setSaleQueue(saleQueue.map((data)=>{
                    return [(parseInt(data[0].split(":")[0], 10) * 60 * 60) + (parseInt(data[0].split(":")[1], 10) * 60),data[1]];
                }))    
            }
        }catch(err){
            toast.error("خطا در برقراری ارتباط",{
                position: toast.POSITION.BOTTOM_LEFT
                });
            console.log(err);
        }
    }

    useEffect(()=>{
        getMarketArray();
        getMarketExcite();
        getMarketArzesh();
        getMarketQueue();
    },[])
    

    return(
        <div className="charts">
            <MarketArray 
                DataOne={DataOne}
                DataTwo={DataTwo}
                DataThree={DataThree}
                DataFour={DataFour}
                DataFive={DataFive}
            />
            <MarketExcite
                exOne={exOne} 
                exTwo={exTwo} 
                exThree={exThree}
                exFour={exFour}
                exFive={exFive}
                exSix={exSix}
                exSeven={exSeven}
                exEight={exEight}
                exNine={exNine}
                exTen={exTen}            
            />
            <ArzeshChart
                arzeshBuy={arzeshBuy}
                arzeshSale={arzeshSale}
            />
            <MarketQueue 
                buyQueue={buyQueue}
                setBuyQueue={setBuyQueue}
                setSaleQueue={setSaleQueue}
                saleQueue={saleQueue}
                getMarketQueue={getMarketQueue}
            />
        </div>
    )
}
export default Charts;