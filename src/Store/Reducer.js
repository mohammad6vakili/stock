import {
    SIDE_PANEL,
    MARKET_DATA,
    STOCK_DATA,
    LAST_UPDATE,
    CLIENT_TYPE,
    STOCK_OHLC,
    SIGNALS,
    STOCK_SIGNAL,
    TODAY_SIGNAL,
  } from "./Action";
       
  const initialState = {
    marketData:null,
    stockData:null,
    sidePanel:null,
    lastUpdate:null,
    clienttype:null,
    stockOhlc:null,
    signals:null,
    stockSignal:null,
    todaySignal:[]
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
      case STOCK_OHLC:
        return {...state , stockOhlc:action.payload};
      case SIGNALS:
        return {...state , signals:action.payload};
      case STOCK_SIGNAL:
        return {...state , stockSignal:action.payload};
      case TODAY_SIGNAL:
        return {...state , todaySignal:action.payload};
      default:
    return state;
    }
  };
  export default Reducer;
    