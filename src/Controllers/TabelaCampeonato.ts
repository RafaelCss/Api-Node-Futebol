import { Router, Request, Response } from 'express'
import servico from '../Domain/Comandos/ComandoTabela';;
import IPaginacao from '../Domain/Interfaces/Paginacao';
import validarToken from '../Services/Seguranca/ValidarToken';


const tabelaCampeonato = Router();

//validarToken,
tabelaCampeonato.get("/tabela",async (req: Request, res: Response) => {
  const paginacao = req.query
  const comando = await servico.comandoBuscarTabela()
  res.send(comando)
})



export default tabelaCampeonato;

