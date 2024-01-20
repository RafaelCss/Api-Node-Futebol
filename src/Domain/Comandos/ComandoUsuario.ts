import { LoginUsuario, Usuario } from '../Interfaces/Usuario';
import { Retorno, RetornoToken } from '../Interfaces/Retorno';
import Usuarios from '../Entidades/Clientes';
import UsuarioRepository from '../../Infra/Repositorios/RepositorioUsuario';
import {gerarToken }from '../../Services/Seguranca/GerarToken';
import { gerarRefreshToken } from '../../Services/Seguranca/GerarRefreshToken';

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
  const expiresInAccessToken = 15 * 60; // 15 minutos
  const accessTokenExpires = Date.now() + expiresInAccessToken * 1000;

  // Configurando o tempo de expiração do token de atualização (em segundos)
  const expiresInRefreshToken = 7 * 24 * 60 * 60; // 7 dias
  const refreshTokenExpires = Date.now() + expiresInRefreshToken * 1000;
  if (usuario) {
    const token = gerarToken(usuario as any);
    return {
      user:{
        access_token: token,
        name: usuario?.nome,
        email: usuario?.email,
        token_type: 'Bearer',
      },
      token:{
        access_token: token,
        expires: accessTokenExpires,
        refresh_token_expires: refreshTokenExpires,
        refresh_token: await gerarRefreshToken(usuario as any),
      },
      access_token: token,
      expires: accessTokenExpires,
      refresh_token_expires: refreshTokenExpires,
      refresh_token: await gerarRefreshToken(usuario as any),
    };
  }
  return null;
}

async function comandoGerarRefreshToken(dados: any): Promise<RetornoToken | null> {
  const usuario = await repositorio.BuscarUsuarioPorEmail({
    email: dados.email
  }as any);
  const expiresInAccessToken = 15 * 60; // 15 minutos
  const accessTokenExpires = Date.now() + expiresInAccessToken * 1000;

  // Configurando o tempo de expiração do token de atualização (em segundos)
  const expiresInRefreshToken = 7 * 24 * 60 * 60; // 7 dias
  const refreshTokenExpires = Date.now() + expiresInRefreshToken * 1000;
  if (usuario) {
    const token = gerarToken(usuario as any);
    return {
      access_token: token,
      expires: accessTokenExpires,
      refresh_token_expires: refreshTokenExpires,
      refresh_token: await gerarRefreshToken(usuario as any),
    };
  }
  return null;
}

export default { comandoCadastrarUsuario, comandoLogarUsuario,  comandoGerarRefreshToken};
