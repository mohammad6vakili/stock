import React, { useEffect, useState } from 'react';
import "./Charts.css";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import MarketArray from './Extra/MarketArray';

const Charts =()=>{
    const [DataOne , setDataOne]=useState({name:"بیشتر از 3 درصد منفی",data:[]});
    const [DataTwo , setDataTwo]=useState({name:"بین 0.5 تا 3 درصد منفی",data:[]});
    const [DataThree , setDataThree]=useState({name:"بین منفی 0.5 تا مثبت 0.5",data:[]});
    const [DataFour , setDataFour]=useState({name:"بین 0.5 تا 3 درصد مثبت",data:[]});
    const [DataFive , setDataFive]=useState({name:"بیش از 3 درصد مثبت",data:[]});
    const [time , setTime]=useState([]);

    const getMarketArray=async()=>{
        try{
            const response = await axios.get(Env.baseURL + "/marketarray");
            for (let index=0;index<Object.keys(response.data).length;index++) {
                time.push(Object.keys(response.data)[index]);
                DataOne.data.push([Object.keys(response.data)[index],Object.values(response.data)[index][0]]);
                DataTwo.data.push([Object.keys(response.data)[index],Object.values(response.data)[index][1]]);
                DataThree.data.push([Object.keys(response.data)[index],Object.values(response.data)[index][2]]);
                DataFour.data.push([Object.keys(response.data)[index],Object.values(response.data)[index][3]]);
                DataFive.data.push([Object.keys(response.data)[index],Object.values(response.data)[index][4]]);
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
    },[])
    
    const logger=()=>{
        console.log(DataOne);
        console.log(DataTwo);
        console.log(DataThree);
        console.log(DataFour);
        console.log(DataFive);
    }

    return(
        <div className="charts">
            <button onClick={logger}>click</button>
            <MarketArray 
                DataOne={DataOne} 
                DataTwo={DataTwo} 
                DataThree={DataThree}
                DataFour={DataFour}
                DataFive={DataFive}
                time={time}
            />
        </div>
    )
}
export default Charts;