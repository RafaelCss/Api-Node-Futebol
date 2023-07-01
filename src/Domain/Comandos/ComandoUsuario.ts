import { Usuario } from "../Interfaces/Usuario";
import Retorno from "../Interfaces/Retorno";
import Usuarios from "../Entidades/Clientes";
import UsuarioRepository from "../../Infra/Repositorios/RepositorioUsuario";


const repositorio = new UsuarioRepository()

async function comandoCadastrarUsuario(usuario: Usuario): Promise<Retorno<Usuario>> {

  const validarCliente = new Usuarios({
    senha: usuario.senha,
    email: usuario.email,
    nome: usuario.nome,
  })
  if (validarCliente.erro[0]) {
    return {
      sucesso: false,
      erros: validarCliente.erro
    }
  }
  const salvar = await repositorio.Criar({
    senha: validarCliente.senha,
    email: validarCliente.email,
    nome: validarCliente.nome,
  })
  return {
    dados: salvar.dados,
    sucesso: salvar.sucesso,
    message: salvar.message
  }
}
// async function comandoClienteDelete(id: string) {
//   const clientes = repositorio.delete(id)
//   return clientes
// }

// async function comandoClienteBuscar(query: IPaginacao): Promise<Retorno<Cliente>> {
//   const clientes = repositorio.findMany(query)
//   return clientes;
// }


// async function comandoClienteEditar(id: string, data: Cliente): Promise<Retorno<Cliente>> {
//   const validarCliente = new Clientes({
//     cpf: data.cpf,
//     email: data.email,
//     nome: data.nome,
//     telefone: data.telefone,
//     endereco: data.endereco
//   })
//   if (!validarCliente.erro.length) {
//     const resposta = await repositorio.editar(id, validarCliente)
//     return resposta
//   }

//   return {
//     erros: validarCliente.erro,
//     mensagem: "Erro ao editar cliente"
//   }

// }


export default { comandoCadastrarUsuario }