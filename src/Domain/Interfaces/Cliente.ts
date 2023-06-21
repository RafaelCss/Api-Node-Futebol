export interface Cliente {
  id      ?: string
  nome    : string
  email   : string
  telefone : string
  endereco ?: Endereco
  cpf      : string
  create_at ?: Date
  update_at ?: Date
}

export interface Endereco {
  id ?:string
  rua ?:string
  bairro?:string
  cidade?:string
}