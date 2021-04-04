import {authConstants} from "./constants";
import axios from '../helpers/axios';

export const login = (user) => {
  // console.log(user);

  return async(dispatch) => {

    dispatch({
      type : authConstants.LOGIN_REQUEST
    })
    const res = await axios.post('/user/signin' , {
      ...user
    } )

    if(res.status == 200){
      const { token , user } = res.data;
      localStorage.setItem('token' , token );
      localStorage.setItem('user' , JSON.stringify('user'));
      localStorage.setItem('userId' , user._id );
      // console.log(user._id);
      dispatch({
        type : authConstants.LOGIN_SUCCESS,
        payload : {
          token,user
        }
      })
    }else{
      if(res.status == 400){
        dispatch({
          type : authConstants.LOGIN_FAILURE,
          payload : {
            error : res.data.error
          }
        })
      }
    }

    // dispatch({
    //   type : authConstants.LOGIN_REQUEST,
    //   payload : {
    //     ...user
    //     // login : true
    //   }
    // })
  }
}

export const isUserLoggedIn = () => {
  return async dispatch => {
    const token = localStorage.getItem('token')
    if(token){
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type : authConstants.LOGIN_SUCCESS,
        payload : {
          token,user
        }
      })
      // dispatch ( {
      //   payload :{
      //     token
      //   }
      // })
    }else{
      dispatch({
          type : authConstants.LOGIN_FAILURE,
          payload : {
            error : "Failed to Login"
          }
        })
    }
  }
}

export const signout = () => {
  return async dispatch => {

    dispatch({
      type : authConstants.LOGOUT_REQUEST
    })

    const res=await axios.post('/user/signout')

    if(res.status == 200){
      localStorage.clear();
      dispatch({
        type : authConstants.LOGOUT_SUCCESS
      });
    }else{
      dispatch({
        type : authConstants.LOGOUT_FAILURE,
        payload : {
          error : res.data.error
        }
      });
    }

    
      
  }
}

