import { eventConstants } from "../actions/constants";

const initState = [
  {
    title : '',
    description : '',
    start : '',
    end : '',  
    allDay : true,
    color : '',
    status : '',
    userId:''
  }
];

export default (state = initState , action) => {

  console.log(action);
  

  switch(action.type){
    case eventConstants.EVENT_REGISTER_REQUEST : 
      state = {
        ...state
      }
      break;

    case eventConstants.EVENT_REGISTER_SUCCESS :
      state = {
        // ...state,
        event : action.payload.event
      }
      break;    
    case eventConstants.EVENT_REGISTER_FAILURE :
        state = {
          ...state,

        } 
        break;  
    // case eventConstants.GET_EVENT_REQUEST : 
        // state = {
          // ...state
        // }
        // break;
    case eventConstants.GET_EVENT_SUCCESS : 
        state = [
          // ...state,
          ...action.payload.event
        ]
        // state = action.payload.event
        break;
  
    // case eventConstants.GET_EVENT_FAILURE : 
    //     state = {
    //       ...state
    //     }
    //     break;
      
  }
  return state;
}
