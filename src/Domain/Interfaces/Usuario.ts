export interface Usuario {
  id?: string
  nome: string
  email: string
  senha?: string
  create_at?: Date
  update_at?: Date
}

export interface LoginUsuario {
  email: string
  senha: string
}

export interface TokenUsuario {
  token: string;
  expires:number;
}