import {Request, Response, NextFunction } from 'express'
import servico from '../Comandos/ComandoUsuario'

 async  function UsuarioLogin(req : Request, res : Response, next : NextFunction ) {
 const comando = await  servico.comandoLogarUsuario(req.body)
 res.send(comando)
}


export default UsuarioLogin;