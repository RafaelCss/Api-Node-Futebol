import axios from 'axios'
import dotEnv from "dotenv"
const dot = dotEnv.config()

const api = axios.create({
  baseURL : process.env.API_RANDOM_USER
})



export default api;