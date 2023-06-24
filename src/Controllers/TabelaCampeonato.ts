import { Router, Request, Response } from 'express'
import servico from '../Domain/Comandos/ComandoTabela';;
import IPaginacao from '../Domain/Interfaces/Paginacao';

const tabelaCampeonato = Router();


tabelaCampeonato.get("/tabela", async (req: Request, res: Response) => {
  const paginacao = req.query
  const comando = await servico.comandoBuscarTabela({
    skip: Number(paginacao.skip) ? Number(paginacao.skip) : 0,
    take: Number(paginacao.take) ? Number(paginacao.take) : 10
  } as IPaginacao)
  res.send({ comando })
})





export default tabelaCampeonato;