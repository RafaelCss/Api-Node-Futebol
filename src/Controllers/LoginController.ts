import {Router,Request, Response } from 'express'
import User from '../Domain/Entidades/Clientes';
import UsuarioLogin from '../Domain/Entidades/UsuarioLogin';

const routerLogin = Router()

routerLogin.get("/", async (req : Request, res : Response)=>{
    res.send({"msg":"você está conectado"})
})

 routerLogin.post("/login",UsuarioLogin, async (req : Request, res : Response, next)=>{
  const { nome , senha, checked} = req.body;
  res.send({nome, checked}).status(201)
})



export default routerLogin;