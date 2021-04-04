import {eventConstants} from "./constants";
import axios from '../helpers/axios';
// import { useDispatch , useSelector } from 'react-redux';

export const createEvent = (event) => {
  console.log(event);

  return async(dispatch) => {

    dispatch({
      type : eventConstants.EVENT_REGISTER_REQUEST
    })
    const res = await axios.post('/event/create' , event )

    if(res.status == 201){
    //   const {message} = res.data;
      dispatch({
        type : eventConstants.EVENT_REGISTER_SUCCESS,
        payload : {
        //   message
        event
        }
      })
    }else{
    //   if(res.status == 400){
        dispatch({
          type : eventConstants.EVENT_REGISTER_FAILURE,
          payload : {
            error : res.data.error
          }
        })
    //   }
    }
  }
}

// export const createEvent = (event) => {
//   console.log(event);

//   return async(dispatch) => {

//     dispatch({
//       type : eventConstants.EVENT_REGISTER_REQUEST
//     })
//     const res = await axios.post('/event/create' , event )

//     if(res.status == 201){
//     //   const {message} = res.data;
//       dispatch({
//         type : eventConstants.EVENT_REGISTER_SUCCESS,
//         payload : {
//         //   message
//         event
//         }
//       })
//     }else{
//     //   if(res.status == 400){
//         dispatch({
//           type : eventConstants.EVENT_REGISTER_FAILURE,
//           payload : {
//             error : res.data.error
//           }
//         })
//     //   }
//     }
//   }
// }

// const event = useSelector(state => state.event)
// const renderEvents = (event) => {
//     console.log(event);

//     for(let eve of event)
//     {
//         defaultEvents.push({
//             title : eve.title,
//             description : eve.description,
//             start : eve.start,
//             end : eve.end,  
//             allDay : eve.allDay,
//             color : eve.color,
//             status : eve.status,
//             userId:eve.userId,
//         })
//     }
//     // return defaultEvents;
// }

export const getEvent = () => {
  // console.log();

  return async(dispatch) => {

    dispatch({
      type : eventConstants.GET_EVENT_REQUEST
    })
    const res = await axios.get(`/event/details/${localStorage.getItem("userId")}`)

    console.log(localStorage.getItem("userId"));

    if(res.status == 200){
    //   const {message} = res.data;
      dispatch({
        type : eventConstants.GET_EVENT_SUCCESS,
        payload : {
        //   message
          event : res.data 
        }
      })
    }else{
    //   if(res.status == 400){
        dispatch({
          type : eventConstants.GET_EVENT_FAILURE,
          payload : {
            error : res.data.error
          }
        })
    //   }
    }
  }
}

// export const isUserLoggedIn = () => {
//   return async dispatch => {
//     const token = localStorage.getItem('token')
//     if(token){
//       const user = JSON.parse(localStorage.getItem('user'));
//       dispatch({
//         type : authConstants.LOGIN_SUCCESS,
//         payload : {
//           token,user
//         }
//       })
//       // dispatch ( {
//       //   payload :{
//       //     token
//       //   }
//       // })
//     }else{
//       dispatch({
//           type : authConstants.LOGIN_FAILURE,
//           payload : {
//             error : "Failed to Login"
//           }
//         })
//     }
//   }
// }

// export const signout = () => {
//   return async dispatch => {

//     dispatch({
//       type : authConstants.LOGOUT_REQUEST
//     })

//     const res=await axios.post('/admin/signout')

//     if(res.status == 200){
//       localStorage.clear();
//       dispatch({
//         type : authConstants.LOGOUT_SUCCESS
//       });
//     }else{
//       dispatch({
//         type : authConstants.LOGOUT_FAILURE,
//         payload : {
//           error : res.data.error
//         }
//       });
//     }
//   }
// }

