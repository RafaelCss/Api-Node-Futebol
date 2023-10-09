
import TabelaRepository from "../../Infra/Repositorios/TabelaRepository";
import IPaginacao from "../Interfaces/Paginacao";
import {Retorno }from "../Interfaces/Retorno";
import { TabelaViewModel } from "../Interfaces/TabelaCampeonato";


const repositorio = new TabelaRepository()

async function comandoBuscarTabela(query?: IPaginacao): Promise<Retorno<TabelaViewModel>> {
  const tabela : any[] = await repositorio.FindMany()
  return {
    dados:tabela 
  };
}



export default { comandoBuscarTabela }