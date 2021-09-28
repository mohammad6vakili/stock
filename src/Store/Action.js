export const MARKET_DATA="MARKET_DATA";
export const STOCK_DATA="STOCK_DATA";
export const SIDE_PANEL="SIDE_PANEL";
export const LAST_UPDATE="LAST_UPDATE";
export const CLIENT_TYPE="CLIENT_TYPE";



export const setMarketData=(data)=>{
    return(
        {
            type:MARKET_DATA,
            payload:data
        }
    )
}
export const setStockData=(data)=>{
    return(
        {
            type:STOCK_DATA,
            payload:data
        }
    )
}
export const setSidePanel=(data)=>{
    return(
        {
            type:SIDE_PANEL,
            payload:data
        }
    )
}
export const setLastupdate=(data)=>{
    return(
        {
            type:LAST_UPDATE,
            payload:data
        }
    )
}
export const setClientType=(data)=>{
    return(
        {
            type:CLIENT_TYPE,
            payload:data
        }
    )
}