import React,{useEffect, useState} from 'react';
import "./Menu.css";
import { useHistory , useLocation } from 'react-router';
import { useDispatch , useSelector } from 'react-redux';
import Env from "../Constant/Env.json";
import axios from 'axios';
// import moment from 'moment';
import * as moment from 'jalali-moment';
import { setLastupdate } from '../Store/Action';
import { toast } from 'react-toastify';
import SearchStock from '../Pages/SearchStock';
import searchImage from "../Assets/images/search.svg";
import homeImage from '../Assets/images/home.svg';
import signalImage from "../Assets/images/radio.png";
import chartImage from "../Assets/images/insight.png";
import downImage from "../Assets/images/download.png";


const Header=()=>{
  const history=useHistory();
  const location = useLocation();
  const dispatch=useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const lastUpdate=useSelector(state=>state.Reducer.lastUpdate);

    const lastUpdateReq=async()=>{
      try{
          const response=await axios.get(Env.baseURL + "/history");
          dispatch(setLastupdate(moment(response.data.date).format('DD MMM, YYYY')));
      }catch(err){
          toast.error("خطا در برقراری ارتباط",{
              position: toast.POSITION.BOTTOM_LEFT
              });
          console.log(err);
      }
    }

    const showModal = () => {
      history.push("/");
      setIsModalVisible(true);
    };
    
    const handleOk = () => {
      setIsModalVisible(false);
    };
    
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    useEffect(()=>{
      lastUpdateReq();
    },[]);

    return(
        <div className="header">
            <div>
                Logo
            </div>
            <div className="header-menu">
                <div 
                  onClick={()=>history.push("/")}
                  data-target="tooltip"
                  title="دیده بان"
                >
                  <img style={{width:"140%"}} src={homeImage} alt="home" />
                </div>
                <div
                  onClick={()=>history.push("/charts")}
                  data-target="tooltip"
                  title="نمودار"
                >
                  <img style={{width:"100%"}} src={chartImage} alt="charts" />
                </div>
                <div 
                  onClick={showModal}
                  data-target="tooltip"
                  title="جست و جوی سهم"
                >
                  <img src={searchImage} alt="search" />
                </div>
                <div
                  onClick={()=>history.push("/signals")}
                  data-target="tooltip"
                  title="سیگنال ها"
                >
                  <img src={signalImage} alt="signal"/>
                </div>
                {location.pathname==="/" &&
                  <div
                    data-target="tooltip"
                    title="دانلود جدول به صورت csv"
                  >
                    <a href="http://45.159.113.106:5000/csv?name=market">
                      <img style={{width:"100%"}} src={downImage} alt="download" />
                    </a>
                  </div>
                }
            </div>
            <div className="header-info">
              {lastUpdate &&
                <div>تاریخ آخرین به روزرسانی : {moment(lastUpdate).locale('fa').format('YYYY/M/D')}</div>
              }
            </div>
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