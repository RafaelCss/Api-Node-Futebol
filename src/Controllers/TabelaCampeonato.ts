import { Router, Request, Response } from 'express'
import servico from '../Domain/Comandos/ComandoTabela';;
import IPaginacao from '../Domain/Interfaces/Paginacao';
import ValidarToken from '../Services/Seguranca/ValidarToken';


const tabelaCampeonato = Router();

//validarToken,
tabelaCampeonato.get("/tabela",ValidarToken)



export default tabelaCampeonato;

