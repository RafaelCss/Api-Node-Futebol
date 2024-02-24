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


tabelaCampeonato.get("/atualizar-tabela",async (req: Request, res: Response) => {
  try { 
    await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
    console.log('Job executado com sucesso');
    console.log(new Date());
  } catch (error) {
    console.error('Erro ao executar o job:', error);
  }
  console.log('Job executado com sucesso', new Date());
})

export default tabelaCampeonato;

