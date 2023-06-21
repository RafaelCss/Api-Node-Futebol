import { Cliente, Endereco } from "../Interfaces/Cliente";
import Erros from "../Interfaces/Erros";



class Clientes implements Cliente {
  nome!: string;
  email!: string;
  telefone!: string;
  endereco?: Endereco | undefined;
  cpf!: string;
  erro: Array<Erros> = [];

  constructor({ cpf, email, nome, telefone, endereco }: Cliente) {
    this.ValidarNome(nome)
    this.ValidarEmail(email)
    this.ValidarCPF(cpf)
    this.ValidarTelefone(telefone)
    this.ValidarEndereco(endereco)
  }


  private async ValidarNome(nome: string) {
    if (nome.length < 3) {
      this.erro.push({
        campo: "nome",
        mensagem: "Campo invalido"
      })
    }

    return this.nome = nome
  }

  private async ValidarTelefone(telefone: string) {
    if (telefone) {
      return this.telefone = telefone
    }
    this.erro.push({
      campo: 'telefone',
      mensagem: "Campo invalido"
    })
  }

  private async ValidarEmail(email: string) {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i
    if (regex.test(email) === true) {
      return this.email = email
    }
    this.erro.push({
      campo: "email",
      mensagem: "Campo invalido"
    })
  }

  private async ValidarCPF(cpf: string) {
    const newCpf = cpf.replace(/[.-]/g, '')
    if (newCpf) {
      return this.cpf = newCpf
    }
    this.erro.push({
      campo: 'cpf',
      mensagem: "Campo invalido"
    })
  }

  private async ValidarEndereco(endereco?: Endereco) {
    if (endereco) {
      return this.endereco = {
        bairro: endereco?.bairro,
        cidade: endereco?.cidade,
        rua: endereco?.rua
      }
    }
  }

}



export default Clientes;