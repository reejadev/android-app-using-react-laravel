import axios from 'axios';
 import { API_BASE_URL } from './env';


const axiosInstance = axios.create({      
    baseURL: API_BASE_URL,  // <-- Ensure this matches your backend API URL
    headers: {  
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

    withCredentials: false,
});



console.log("🔍 AxiosInstance baseURL:", axiosInstance.defaults.baseURL);


export default axiosInstance;