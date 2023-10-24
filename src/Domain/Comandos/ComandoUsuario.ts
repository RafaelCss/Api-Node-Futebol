import { LoginUsuario, Usuario } from '../Interfaces/Usuario';
import { Retorno, RetornoToken } from '../Interfaces/Retorno';
import Usuarios from '../Entidades/Clientes';
import UsuarioRepository from '../../Infra/Repositorios/RepositorioUsuario';
import gerarToken from '../../Services/Seguranca/GerarToken';

const repositorio = new UsuarioRepository();

async function comandoCadastrarUsuario(usuario: Usuario): Promise<Retorno<Usuario>> {
  const validarCliente = new Usuarios({
    senha: usuario.senha,
    email: usuario.email,
    nome: usuario.nome
  });
  if (validarCliente.erro.length > 0) {
    return {
      sucesso: false,
      erros: validarCliente.erro
    };
  }
  const salvar = await repositorio.Criar({
    senha: validarCliente.senha,
    email: validarCliente.email,
    nome: validarCliente.nome
  });
  return {
    dados: salvar.dados,
    sucesso: salvar.sucesso,
    message: salvar.message
  };
}

async function comandoLogarUsuario(dados: any): Promise<RetornoToken | null> {
  const usuario = await repositorio.BuscarUsuario({
    senha: dados.senha,
    email: dados.email
  });

  if (usuario) {
    const token = gerarToken(usuario as any);
    return {
      access_token: token,
      name: usuario?.nome,
      email: usuario?.email,
      token_type: 'Bearer',
    };
  }
  return null;
}

export default { comandoCadastrarUsuario, comandoLogarUsuario };
