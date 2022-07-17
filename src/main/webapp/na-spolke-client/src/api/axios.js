import axios from 'axios';
import Axios from "axios";
const BASE_URL = 'http://localhost:8080';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
let i = 0;
export const getCompanyFromDb=(companyId, func) =>{
    Axios.get(`${BASE_URL}/company/${companyId}`)
        .then((response)=> func(response.data))
        .catch((error)=>console.log(error))
    console.log(++i)
}

