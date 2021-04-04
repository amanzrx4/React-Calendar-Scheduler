import { userConstants } from "../actions/constants";

const initState = {
  error : null,
  message : '',
  loading : false
};

export default (state = initState , action) => {

  // console.log(action);
  

  switch(action.type){

    case userConstants.USER_REGISTER_REQUEST : 
      state = {
        ...state,
        loading : true
      }
      break;

    case userConstants.USER_REGISTER_SUCCESS :
      state = {
        ...state,
        message : action.payload.message,
        loading : false
      }
      break;

    case userConstants.LOGOUT_REQUEST : 
      state = {
        ...initState,
        loading : false,
        error : action.payload.error
      }
      break;
    
  }
  return state;
}