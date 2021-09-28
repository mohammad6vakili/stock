import {
    SIDE_PANEL,
    MARKET_DATA,
    STOCK_DATA,
    LAST_UPDATE,
    CLIENT_TYPE
  } from "./Action";
       
  const initialState = {
    marketData:null,
    stockData:null,
    sidePanel:null,
    lastUpdate:null,
    clienttype:null
  };
       
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case MARKET_DATA:
        return {...state , marketData:action.payload};
      case STOCK_DATA:
        return {...state , stockData:action.payload};
      case SIDE_PANEL:
        return {...state , sidePanel:action.payload};
      case LAST_UPDATE:
        return {...state , lastUpdate:action.payload};
      case CLIENT_TYPE:
        return {...state , clienttype:action.payload};
      default:
    return state;
    }
  };
  export default Reducer;
    