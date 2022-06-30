import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    // headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "http://localhost:3000", 'Access-Control-Allow-Credentials': true },
    withCredentials: true
});