import {
    SIDE_PANEL,
    MARKET_DATA,
    STOCK_DATA
  } from "./Action";
       
  const initialState = {
    marketData:null,
    stockData:null,
    sidePanel:null
  };
       
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case MARKET_DATA:
        return {...state , marketData:action.payload};
      case STOCK_DATA:
        return {...state , stockData:action.payload};
      case SIDE_PANEL:
        return {...state , sidePanel:action.payload};
      default:
    return state;
    }
  };
  export default Reducer;
    