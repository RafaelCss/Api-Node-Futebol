import { salvarDadosTabelaNoDataBase } from '../../Infra/MongoDb'
import apiTabelaCampeonato from './servicoTabela'
import cron from 'node-cron';

async function salvarTabelaNoBancoDeDados() {
  const resposta: any[] = await apiTabelaCampeonato.get('tabela')
    .then(res => res.data)
    .catch(err => console.error(err))
  cron.schedule('0 0 8,12,16 * * *', async () => {
    try {
      await salvarDadosTabelaNoDataBase(resposta);
      console.log('Job executado com sucesso');
    } catch (error) {
      console.error('Erro ao executar o job:', error);
    }
  });
}


export default salvarTabelaNoBancoDeDados