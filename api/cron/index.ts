import { salvarDadosTabelaNoDataBase } from '../../src/Infra/MongoDb';
import buscarDadosTabelaCampeonato from '../../src/Services/ServicesExternos/jobTabela';

export default async function handler() {
  await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
  console.log('Job executado com sucesso', new Date());
}
