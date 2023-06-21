import Clientes from "../Entidades/Clientes";
import { Cliente } from "../Interfaces/Cliente";
import ClienteRepository from "../../Infra/Repositorios/RepositorioCliente"
import IPaginacao from "../Interfaces/Paginacao";
import Retorno from "../Interfaces/Retorno";


const repositorio = new ClienteRepository()

async function comandoClienteCadastrar(cliente: Cliente): Promise<Retorno<Cliente>> {
  let retorno: Retorno<Cliente>;

  if (!cliente.id) {
    const validarCliente = new Clientes({
      cpf: cliente.cpf,
      email: cliente.email,
      nome: cliente.nome,
      telefone: cliente.telefone,
      endereco: cliente.endereco
    })

    if (!validarCliente.erro.length) {
      const salvar = await repositorio.criar({
        cpf: validarCliente.cpf,
        email: validarCliente.email,
        nome: validarCliente.nome,
        telefone: validarCliente.telefone,
        endereco: validarCliente.endereco
      })

      retorno = {
        erros: validarCliente.erro,
        dados: [],
        mensagem: "Cliente cadastrado",
        id: salvar
      }
      return retorno
    }

    retorno = {
      erros: validarCliente.erro,
      mensagem: "Erro ao realizar cadastro",
    }
    return retorno
  }
  return await comandoClienteEditar(cliente.id, cliente)
}

async function comandoClienteDelete(id: string) {
  const clientes = repositorio.delete(id)
  return clientes
}

async function comandoClienteBuscar(query: IPaginacao): Promise<Retorno<Cliente>> {
  const clientes = repositorio.findMany(query)
  return clientes;
}


async function comandoClienteEditar(id: string, data: Cliente): Promise<Retorno<Cliente>> {
  const validarCliente = new Clientes({
    cpf: data.cpf,
    email: data.email,
    nome: data.nome,
    telefone: data.telefone,
    endereco: data.endereco
  })
  if (!validarCliente.erro.length) {
    const resposta = await repositorio.editar(id, validarCliente)
    return resposta
  }

  return {
    erros: validarCliente.erro,
    mensagem: "Erro ao editar cliente"
  }

}


export default { comandoClienteCadastrar, comandoClienteDelete, comandoClienteBuscar, comandoClienteEditar }