import { Router, Request, Response } from 'express'
import buscarTodos from '../Domain/Services/ServicesExternos/ServicesUsuarios/buscarUsuarios';

const routerUsuarios = Router()


routerUsuarios.get("/usuarios", async (req: Request, res: Response) => {
  const { page, resultado } = req.query
  const resposta = await buscarTodos({
    page: Number(page),
    resultado: Number(resultado)
  })
  res.send({ dados: resposta }).status(200)
})


export default routerUsuarios;
