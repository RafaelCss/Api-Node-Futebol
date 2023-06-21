import Erros from "./Erros"
import IPaginacao from "./Paginacao"

interface Retorno<T> {
  dados ?: T[]
  erros ?: Erros[] | Erros
  paginacao ?: IPaginacao
  mensagem ?: string
  id ?:  string
}


export default Retorno