import { Router, Request, Response, NextFunction } from 'express'

  function UsuarioLogin(req : Request, res : Response, next : NextFunction ) {
  const {nome , senha, checked} = req.body
  if( nome === 'desafiosharenergy' && senha ==='sh@r3n3rgy'){
   return next()
  }
  res.send({erro :"Usuario ou senha invalida"})
}


export default UsuarioLogin;