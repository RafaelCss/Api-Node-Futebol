
import TabelaRepository from "../../Infra/Repositorios/TabelaRepository";
import IPaginacao from "../Interfaces/Paginacao";
import Retorno from "../Interfaces/Retorno";


const repositorio = new TabelaRepository()

async function comandoBuscarTabela(query?: IPaginacao): Promise<Retorno<any[]>> {
  const tabela = await repositorio.FindMany()
  return tabela;
}



export default { comandoBuscarTabela }