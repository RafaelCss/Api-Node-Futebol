import Usuario from "../../../Interfaces/Usuario"
import api from "../config"
const query = `?page=${3}&results=${1}&seed=abc`


interface IPaginacao {
  page : number
  resultado ?: number
}

async function buscarTodos({page, resultado = 10} : IPaginacao){
  const resposta  = await api.get( `?page=${page}&results=${resultado}&seed=abc`)

  const tratamentoResposta : Usuario[] = resposta.data.results

  const usuarios = tratamentoResposta.map(item =>{
    return {
     id : item.login.uuid,
     name : item.name.first +' '+ item.name.last,
     email : item.email,
     login : item.login.username,
     age  : item.dob.age,
     photo : item.picture.medium
    }
   })

  return usuarios;
}



export default buscarTodos;