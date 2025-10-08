import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://srv960019.hstgr.cloud/',
});

export default axiosInstance;