import React,{useState} from 'react';
import "./Menu.css";
import { useHistory } from 'react-router';
import SearchStock from '../Pages/SearchStock';
import searchImage from "../Assets/images/search.svg";
import homeImage from '../Assets/images/home.svg';

const Header=()=>{
  const history=useHistory();
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
                <div onClick={()=>history.push("/")}><img style={{width:"140%"}} src={homeImage} alt="home" /></div>
                <div onClick={showModal}><img src={searchImage} alt="search" /></div>
            </div>
            <div>Infos</div>
            <SearchStock 
                isModalVisible={isModalVisible} 
                handleOk={handleOk}
                handleCancel={handleCancel}
                setIsModalVisible={setIsModalVisible}
            />
        </div>
    )
}
export default Header;