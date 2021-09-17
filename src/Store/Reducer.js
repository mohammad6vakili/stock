import {
    MARKET_DATA
  } from "./Action";
       
  const initialState = {
    marketData:null
  };
       
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case MARKET_DATA:
        return {...state , marketData:action.payload}
      default:
    return state;
    }
  };
  export default Reducer;
    