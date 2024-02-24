
import { Tabela } from "@prisma/client";
import TabelaRepository from "../../Infra/Repositorios/TabelaRepository";
import IPaginacao from "../../Domain/Interfaces/Paginacao";
import {Retorno }from "../../Domain/Interfaces/Retorno";
import { TabelaViewModel } from "../../Domain/Interfaces/TabelaCampeonato";


const repositorio = new TabelaRepository()

async function buscarTabela(query?: IPaginacao): Promise<Retorno<[TabelaViewModel[]]>> {
  const tabela : any[] = await repositorio.FindMany()
  return {
    dados:tabela.sort((a, b) => b.pontos - a.pontos)
  };
}



export default { buscarTabela }