
const initialState = {
    time:''
}
 
function reducer(state = initialState, action){
switch (action.type) {
    case "STORE_TIME":
      console.log(action.token)
      return{
        ...state,
        time:action.token
      };
    default:
      return state;
  }
}
 
export default reducer;