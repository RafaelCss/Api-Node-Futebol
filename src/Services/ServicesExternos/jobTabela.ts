import { salvarDadosTabelaNoDataBase } from '../../Infra/MongoDb'
import apiTabelaCampeonato from './servicoTabela'
import cron from 'node-cron';

async function salvarTabelaNoBancoDeDados() {
  const resposta: any[] = await apiTabelaCampeonato.get('tabela')
    .then(res => res.data)
    .catch(err => console.error(err))

  return resposta;
}

cron.schedule("* * * * *", async () => {
  try {
    await salvarDadosTabelaNoDataBase(await salvarTabelaNoBancoDeDados());
    console.log('Job executado com sucesso');
    console.log(new Date())
  } catch (error) {
    console.error('Erro ao executar o job:', error);
  }
});

export default salvarTabelaNoBancoDeDados