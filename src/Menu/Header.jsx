import React,{useState} from 'react';
import "./Menu.css";
import SearchStock from '../Pages/SearchStock';
import searchImage from "../Assets/images/search.svg";


const Header=()=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleOk = () => {
      setIsModalVisible(false);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return(
        <div className="header">
            <div>
                Logo
            </div>
            <div className="header-menu">
                <div onClick={showModal}><img src={searchImage} alt="search" /></div>
            </div>
            <div>Infos</div>
            <SearchStock 
                isModalVisible={isModalVisible} 
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </div>
    )
}
export default Header;