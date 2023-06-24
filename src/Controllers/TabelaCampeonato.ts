import { Router, Request, Response } from 'express'
import servico from '../Domain/Comandos/ComandoCliente';
import { Cliente } from '../Domain/Interfaces/Cliente';
import IPaginacao from '../Domain/Interfaces/Paginacao';

const tabelaCampeonato = Router();


tabelaCampeonato.get("/tabela", async (req: Request, res: Response) => {
  const paginacao = req.query
  const comando = await servico.comandoClienteBuscar({
    skip: Number(paginacao.skip) ? Number(paginacao.skip) : 0,
    take: Number(paginacao.take) ? Number(paginacao.take) : 10
  } as IPaginacao)
  res.send({ comando })
})





export default tabelaCampeonato;