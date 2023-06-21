import { Router, Request, Response } from 'express'
import servico from '../Domain/Comandos/ComandoCliente';
import { Cliente } from '../Domain/Interfaces/Cliente';
import IPaginacao from '../Domain/Interfaces/Paginacao';

const routerClientes = Router();


routerClientes.get("/clientes", async (req: Request, res: Response) => {
  const paginacao = req.query
  const comando = await servico.comandoClienteBuscar({
    skip: Number(paginacao.skip) ? Number(paginacao.skip) : 0,
    take: Number(paginacao.take) ? Number(paginacao.take) : 10
  } as IPaginacao)
  res.send({ comando })
})

routerClientes.post("/clientes", async (req: Request, res: Response) => {
  const cliente: Cliente = req.body;
  const comando = await servico.comandoClienteCadastrar(cliente)
  res.send({ comando })
})

routerClientes.delete("/clientes/:id", async (req: Request, res: Response) => {
  const id = req.body.id
  const comando = await servico.comandoClienteDelete(id)
  res.send({ comando })
})




export default routerClientes;