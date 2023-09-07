import { salvarDadosTabelaNoDataBase } from "../../src/Infra/MongoDb";
import buscarDadosTabelaCampeonato from "../../src/Services/ServicesExternos/jobTabela";


export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; end: { (arg0: string): void; new(): any; }; }; }) {
    try { 
      await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
      console.log('Job executado com sucesso');
      console.log(new Date());
    } catch (error) {
      console.error('Erro ao executar o job:', error);
    }
    res.status(200).end('Hello Cron!');
  }
