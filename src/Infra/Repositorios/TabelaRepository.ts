import { Tabela } from '@prisma/client';
import IPaginacao from '../../Domain/Interfaces/Paginacao';
import { Repository } from '../../Domain/Interfaces/Repositorio';
import {Retorno} from '../../Domain/Interfaces/Retorno';
import { TabelaViewModel } from '../../Domain/Interfaces/TabelaCampeonato';
import { recuperarDadosDaTabela } from '../MongoDb';

class TabelaRepository implements Repository<TabelaViewModel> {

 // #region TODO: Buscar tabela campeonato brasileiro
  async FindMany(query?: IPaginacao | undefined): Promise<Tabela[]> {
    const retorno : Tabela[] = await recuperarDadosDaTabela()
    return retorno
  }
 // #endregion


}


export default TabelaRepository;

