import Erros from "./Erros"
import IPaginacao from "./Paginacao"

interface Retorno<T> {
  dados?: T[]
  erros?: Erros[] | Erros
  paginacao?: IPaginacao
  sucesso?: boolean,
  message?: string
}


export default Retorno