import { Router, Request, Response } from 'express'
import servico from '../Aplicacao/Tabela/QueryTabela';;
import IPaginacao from '../Domain/Interfaces/Paginacao';
import { validarToken } from '../Services/Seguranca/ValidarToken';
import { salvarDadosTabelaNoDataBase } from '../Infra/MongoDb';
import buscarDadosTabelaCampeonato from '../Services/ServicesExternos/jobTabela';



const tabelaCampeonato = Router();

tabelaCampeonato.get("/tabela",validarToken ,async (req: Request, res: Response) => {
    const comando = await servico.buscarTabela()
    res.send(comando)
})


tabelaCampeonato.get("/tabela/atualizar-tabela",async (req: Request, res: Response) => {
  try { 
    await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
    res.status(200).end("Busca feita com sucesso")
  } catch (error) {
    res.status(400).send("Erro ao buscar tabela")
  }
  console.log('Job executado com sucesso', new Date());
})

export default tabelaCampeonato;

