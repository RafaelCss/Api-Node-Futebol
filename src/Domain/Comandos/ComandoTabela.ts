
import TabelaRepository from "../../Infra/Repositorios/TabelaRepository";
import { Cliente } from "../Interfaces/Cliente";
import IPaginacao from "../Interfaces/Paginacao";
import Retorno from "../Interfaces/Retorno";


const repositorio = new TabelaRepository()


async function comandoBuscarTabela(query?: IPaginacao): Promise<Retorno<Cliente>> {
  const tabela = repositorio.findMany()
  return tabela;
}



export default { comandoBuscarTabela }