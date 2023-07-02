import { Usuario } from "../Interfaces/Usuario";
import Erros from "../Interfaces/Erros";



class Usuarios implements Usuario {
  nome!: string;
  email!: string;
  senha!: string;
  erro: Erros[] = [];

  constructor({ email, nome, senha }: Usuario) {
    this.ValidarNome(nome)
    this.ValidarEmail(email)
    this.ValidarSenha(senha)
  }


  private async ValidarNome(nome: string) {
    if (nome.length < 3) {
      return this.erro.push({
        'nome': "Campo invalido"
      })
    }

    return this.nome = nome
  }

  private async ValidarSenha(senha: string) {
    if (senha.length > 8 || senha.length < 13) {
      return this.senha = senha
    }
    return this.erro.push({
      'senha': "Senha inválida"
    })
  }

  private async ValidarEmail(email: string) {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i
    if (regex.test(email) === true) {
      return this.email = email
    }
    return this.erro.push({
      'email': "Senha inválida"
    })
  }


}



export default Usuarios;