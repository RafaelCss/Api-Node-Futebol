import {Request, Response, NextFunction } from 'express'
import servico from '../Comandos/Usuario/ComandoLogarUsuario'

 async  function UsuarioLogin(req : Request, res : Response, next : NextFunction ) {
 const comando = await  servico.loginUsuario(req.body)
 res.send(comando)
}


export default UsuarioLogin;