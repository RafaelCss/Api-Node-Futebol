import { Router, Request, Response } from 'express'
import UsuarioLogin from '../Domain/Entidades/UsuarioLogin';
import { Usuario } from '../Domain/Interfaces/Usuario';

const routerLogin = Router()

routerLogin.post("/login", /* UsuarioLogin */ async (req: Request, res: Response, next) => {
  const { senha, email } = req.body as Usuario;
  //  console.log(req.body)
  res.send({ senha, email }).status(201)
})



export default routerLogin;