import { Router, Request, Response } from 'express'
import UsuarioLogin from '../Domain/Entidades/UsuarioLogin';


const routerLogin = Router()

routerLogin.post("/login", UsuarioLogin)



export default routerLogin;