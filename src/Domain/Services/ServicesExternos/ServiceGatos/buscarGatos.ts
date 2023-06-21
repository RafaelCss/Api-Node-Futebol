import axios from "axios";

const api = axios.create({
  baseURL : "https://http.cat/"
})

const buscarGato =  (status : number) =>{
  const resultado : any=  api.get(`${status}`,{
    responseType : 'arraybuffer'
  })
  .then(res => Buffer.from(res.data, 'binary').toString('base64'))
  .catch(err =>  err)
  return resultado
}


export default buscarGato