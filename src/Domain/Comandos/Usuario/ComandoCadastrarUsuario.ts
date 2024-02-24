import UsuarioRepository from '../../../Infra/Repositorios/RepositorioUsuario';
import Usuarios from '../../Entidades/Clientes';
import { RespostaBanco } from '../../Interfaces/RespostaBanco';
import { Usuario } from '../../Interfaces/Usuario';

const repositorio = new UsuarioRepository();

class CadastrarUsuarioComando {
  #Nome: string;
  #Email: string;
  #Senha: string;
  constructor({ nome, email, senha }: Usuario) {
    this.#Nome = nome;
    this.#Email = email;
    this.#Senha = senha as string;
  }

  async Cadastrar() {
    const cadastro = await this.CadastrarUsuario();
    return cadastro;
  }

  private async CadastrarUsuario(): Promise<RespostaBanco<Usuario>> {
    const usuario = new Usuarios({
      nome: this.#Nome,
      email: this.#Email,
      senha: this.#Senha
    });
    if(usuario.erro.length > 0){
      return {
        sucesso:false,
        dados:usuario.erro as any
      }
    }
    const cadastro = await repositorio.Criar(usuario);
    return cadastro;
  }
}

export default CadastrarUsuarioComando;
