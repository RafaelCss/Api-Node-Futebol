import axios from "axios";
import dotEnv from "dotenv"
const dot = dotEnv.config()


const apiTabelaCampeonato = axios.create({
  baseURL: process.env.API_FUTEBOL,
  headers: {
    'Content-Type': 'application json',
    'Authorization': 'Bearer ' + process.env.KEY_API_FUTEBOL
  },
  timeout: 5000
})

axios.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.KEY_API_FUTEBOL;


export default apiTabelaCampeonato;