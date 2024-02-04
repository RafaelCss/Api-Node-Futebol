import { LoginUsuario, Usuario } from '../Interfaces/Usuario';
import { Retorno, RetornoToken } from '../Interfaces/Retorno';
import Usuarios from '../Entidades/Clientes';
import UsuarioRepository from '../../Infra/Repositorios/RepositorioUsuario';
import { gerarToken } from '../../Services/Seguranca/GerarToken';
import { gerarRefreshToken } from '../../Services/Seguranca/GerarRefreshToken';

const repositorio = new UsuarioRepository();

interface SessionData {
  accessToken: string;
  token: string
  name: string | undefined;
  email: string | undefined;
  token_type: string;
  refresh_token: string;
}

async function validarCliente(usuario: Usuario): Promise<Retorno<Usuario>> {
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

async function loginUsuario(dados: any): Promise<RetornoToken | null> {
  
  const usuario = await repositorio.BuscarUsuario({
    senha: dados?.senha,
    email: dados?.email
  });

  if (usuario) {
    const token =  gerarToken(usuario as any);
    const refreshToken = await gerarRefreshToken(usuario as any);

    return {
      session: formatSessionData(token, usuario as any, refreshToken as any),
      user: formatUserData(token, usuario as any, refreshToken as any),
      access_token: token,
      expires: calculateExpires(15 * 60),
      refresh_token_expires: calculateExpires(7 * 24 * 60 * 60),
      refresh_token: refreshToken
    } as any;
  }

  return null;
}

async function gerarRefreshTokenUsuario(dados: any): Promise<RetornoToken | null> {

  const usuario = await repositorio.BuscarUsuarioPorEmail({
    email: dados?.email
  } as any);

  if (usuario) {
    const token =  gerarToken(usuario as any);

    return {
      access_token: token,
      expires: calculateExpires(15 * 60),
      refresh_token_expires: calculateExpires(7 * 24 * 60 * 60),
      refresh_token: await gerarRefreshToken(usuario as any)
    } as any;
  }

  return null;
}

function formatSessionData(token: string, usuario: any, refreshToken: string): SessionData {
  return {
    accessToken: token,
    token: token,
    name: usuario?.nome,
    email: usuario?.email,
    token_type: 'Bearer',
    refresh_token: refreshToken
  };
}

function formatUserData(token: string, usuario: any, refreshToken: string): SessionData {
  return {
    token: token,
    accessToken:token,
    name: usuario?.nome,
    email: usuario?.email,
    token_type: 'Bearer',
    refresh_token: refreshToken
  };
}

function calculateExpires(seconds: number): number {
  return Date.now() + seconds * 1000;
}

const UsuarioComandos = {
  validarCliente,
  loginUsuario,
  gerarRefreshTokenUsuario
};

export default UsuarioComandos;
