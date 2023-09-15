import { Router, Request, Response } from 'express'
import UsuarioLogin from '../Domain/Entidades/UsuarioLogin';


const routerLogin = Router()

routerLogin.post("/login", UsuarioLogin, async (req: Request, res: Response, next) => {
})



export default routerLogin;