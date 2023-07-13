import { Usuario } from "../Interfaces/Usuario";
import Erros from "../Interfaces/Erros";

interface ErrorMessage {
  property: string;
  message: string;
}

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
        'property': "nome",
        'message': "Campo invalido"
      })
    }

    return this.nome = nome
  }

  private async ValidarSenha(senha: string) {
    if (senha.length < 8 || senha.length < 13) {
      return this.senha = senha
    }
    this.erro.push({
      'property': "senha",
      'message': "Campo invalido"
    })
  }

  private async ValidarEmail(email: string) {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i
    if (regex.test(email) === true) {
      return this.email = email
    }
    this.erro.push({
      'property': "email",
      'message': "Este email é invalido"
    })
  }


}



export default Usuarios;