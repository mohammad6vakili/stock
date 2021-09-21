import {
    MARKET_DATA,
    STOCK_DATA
  } from "./Action";
       
  const initialState = {
    marketData:null,
    stockData:null,
  };
       
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case MARKET_DATA:
        return {...state , marketData:action.payload};
      case STOCK_DATA:
        return {...state , stockData:action.payload};
      default:
    return state;
    }
  };
  export default Reducer;
    