import {
    
  } from "./Action";
       
  const initialState = {
    // isLogged:false
  };
       
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
    //   case IS_LOGGED:
        // return {...state , isLogged:action.payload}
      default:
    return state;
    }
  };
  export default Reducer;
    