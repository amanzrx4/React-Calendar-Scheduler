import axios from "axios";
import { api } from '../urlConfig';

// console.log("APi ------------------------------------= " + api);
const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL : api,
  headers : {
    'Authorization' : token ? `Bearer ${token}` : ''
  }
}) 

export default axiosInstance;