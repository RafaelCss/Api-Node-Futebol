import {Router,Request, Response } from 'express'
import buscarGato from '../Domain/Services/ServicesExternos/ServiceGatos/buscarGatos';

const routerGatos = Router();


routerGatos.get('/gatos',async(req : Request , res : Response) =>{
  const {status} = req.query
  const resposta = await buscarGato(Number(status))
  res.send({resposta})
})


export default routerGatos;