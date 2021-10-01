import React,{useState} from 'react';
import "./SearchStock.css";
import { Modal , Input } from 'antd';
import { useSelector } from 'react-redux';
import { setStockData } from '../Store/Action';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const SearchStock=({isModalVisible , handleCancel , handleOk , setIsModalVisible})=>{
    const dispatch=useDispatch();
    const history=useHistory();
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

    const goToStockPanel=(data)=>{
        dispatch(setStockData(data));
        history.push("/stock-panel");
        setIsModalVisible(false);
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
                        <div onClick={()=>goToStockPanel(data)} className="search-result-show-item" key={index}>
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