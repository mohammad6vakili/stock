export const MARKET_DATA="MARKET_DATA";


export const setMarketData=(data)=>{
    return(
        {
            type:MARKET_DATA,
            payload:data
        }
    )
}
