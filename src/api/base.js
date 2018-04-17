import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://challenge.monoqi.net/',
});
export default instance;
