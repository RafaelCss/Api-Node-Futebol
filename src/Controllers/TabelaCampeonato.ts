import { Router, Request, Response } from 'express'
import servico from '../Aplicacao/Tabela/QueryTabela';;
import IPaginacao from '../Domain/Interfaces/Paginacao';
import { validarToken } from '../Services/Seguranca/ValidarToken';



const tabelaCampeonato = Router();

tabelaCampeonato.get("/tabela",validarToken ,async (req: Request, res: Response) => {
    const comando = await servico.buscarTabela()
    res.send(comando)
  })


export default tabelaCampeonato;

