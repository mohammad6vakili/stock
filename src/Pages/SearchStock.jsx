import React,{useState} from 'react';
import "./SearchStock.css";
import { Modal , Input } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {setMarketData} from "../Store/Action";


const SearchStock=({isModalVisible , handleCancel , handleOk})=>{
    const dispatch=useDispatch();
    const [filteredData , setFilteredData]=useState(null);
    const marketData=useSelector(state=>state.Reducer.marketData);

    const searchStockFunc=(e)=>{
            if(e.target.value===""){
                setFilteredData(null)
            }
            if(e.target.value.length>=2){
                setFilteredData(marketData.filter(item=>
                    item.Namad.includes(e.target.value.replace(/ی/g, 'ي'))
                ))
            }
    }

    return(
    <>
        <Modal 
            className="search-stock-modal" 
            title="جستجوی سهم" 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[]}
        >
            <div className="search-stock-modal-body">
                <Input 
                    className="search-stock-input"
                    onChange={(e)=>searchStockFunc(e)}
                />
                <div className="search-result-show">
                    {filteredData && filteredData.map((data,index)=>(
                        <div className="search-result-show-item" key={index}>
                            {data.Namad}
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    </>        
    )
}
export default SearchStock;