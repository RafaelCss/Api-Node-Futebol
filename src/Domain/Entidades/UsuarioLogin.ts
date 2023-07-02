import {Request, Response, NextFunction } from 'express'
import { Usuario } from '../Interfaces/Usuario';

  function UsuarioLogin(req : Request, res : Response, next : NextFunction ) {
  const {senha, email} = req.body as Usuario
  res.send({erro :"Usuario ou senha invalida"})
}


export default UsuarioLogin;