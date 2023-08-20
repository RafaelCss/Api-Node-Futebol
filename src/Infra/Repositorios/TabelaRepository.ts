import { TabelaPayload } from '@prisma/client';
import IPaginacao from '../../Domain/Interfaces/Paginacao';
import { Repository } from '../../Domain/Interfaces/Repositorio';
import Retorno from '../../Domain/Interfaces/Retorno';
import { TabelaViewModel } from '../../Domain/Interfaces/TabelaCampeonato';
import { recuperarDadosDaTabela } from '../MongoDb';

class TabelaRepository implements Repository<TabelaViewModel> {

  //#region TODO: Buscar clientes
  async FindMany(query?: IPaginacao | undefined): Promise<TabelaPayload[]> {
    const retorno : TabelaPayload[] = await recuperarDadosDaTabela()
    return retorno
  }
  //#endregion


}


export default TabelaRepository;

