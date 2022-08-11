import axios from 'axios';
import Axios from "axios";
const BASE_URL = 'http://localhost:8080';

export default axios.create({
    baseURL: BASE_URL
});

export const saveFinancialStatement=(data, companyId) =>{
    console.log(data);
    Axios.post(`${BASE_URL}/save/financial/${companyId}/`, data)
        .then((response)=> console.log(response.data))
        .catch((error)=>console.log(error))
}
