import { salvarDadosTabelaNoDataBase } from '../../src/Infra/MongoDb';
import buscarDadosTabelaCampeonato from '../../src/Services/ServicesExternos/jobTabela';
import cron from 'node-cron';
async function handler(req : Request , res :Response) {
  console.log('Job executado com sucesso', new Date());
}

cron.schedule('0 10 * * *', async () => {
  try { 
    await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
    console.log('Job executado com sucesso');
    console.log(new Date());
  } catch (error) {
    console.error('Erro ao executar o job:', error);
  }
});
// cron.schedule('* * * * *', async () => {
//   handler() 
//   try {
//     await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
//     console.log('Job executado com sucesso');
//     console.log(new Date());
//   } catch (error) {
//     console.error('Erro ao executar o job:', error);

//   }
// });