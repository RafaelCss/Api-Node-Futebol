import Erros from "./Erros"
import IPaginacao from "./Paginacao"

export interface Retorno<T> {
  dados?: T[]
  erros?: Erros[] | Erros
  paginacao?: IPaginacao
  sucesso?: boolean,
  message?: string
}

export interface RetornoToken {
  access_token: string;
  token_type?: "Bearer";
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}


