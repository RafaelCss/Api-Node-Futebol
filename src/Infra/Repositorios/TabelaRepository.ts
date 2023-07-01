import IPaginacao from '../../Domain/Interfaces/Paginacao';
import { Repository } from '../../Domain/Interfaces/Repositorio';
import Retorno from '../../Domain/Interfaces/Retorno';
import { TabelaViewModel } from '../../Domain/Interfaces/TabelaCampeonato';
import { recuperarDadosDaTabela } from '../MongoDb';

class TabelaRepository implements Repository<TabelaViewModel> {

  //#region TODO: Buscar clientes
  async FindMany(query?: IPaginacao | undefined): Promise<Retorno<TabelaViewModel[]>> {
    const retorno: any = await recuperarDadosDaTabela()
      .then((dados) => dados)
      .catch((error) => {
        console.error('Erro ao recuperar os dados da tabela:', error);
      });
    return retorno
  }
  //#endregion


}


export default TabelaRepository;

