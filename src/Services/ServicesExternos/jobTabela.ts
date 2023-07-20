import apiTabelaCampeonato from './servicoTabela'


async function salvarTabelaNoBancoDeDados() {
  const resposta: any[] = await apiTabelaCampeonato.get('tabela')
    .then(res => res.data)
    .catch(err => console.error(err))

  return resposta;
}


export default salvarTabelaNoBancoDeDados