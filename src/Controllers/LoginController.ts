import { Router, Request, Response } from 'express'
import UsuarioLogin from '../Domain/Entidades/UsuarioLogin';
import { validarRefreshToken } from '../Services/Seguranca/ValidarToken';
import servico from '../Domain/Comandos/ComandoUsuario'


const routerLogin = Router()

routerLogin.post("/login", UsuarioLogin)

routerLogin.post('/refresh-token',async (req, res, next) => {
    const retorno = await validarRefreshToken(req, res, next)
   const refresh =  await servico.comandoGerarRefreshToken(retorno as any)

   res.send(refresh)
});

export default routerLogin;