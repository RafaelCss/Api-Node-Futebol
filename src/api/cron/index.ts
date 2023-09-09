import { salvarDadosTabelaNoDataBase } from '../../Infra/MongoDb';
import buscarDadosTabelaCampeonato from '../../Services/ServicesExternos/jobTabela';

export default async function handler() {
  await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
  console.log('Job executado com sucesso', new Date());
}
