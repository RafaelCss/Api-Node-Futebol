import { Router, Request, Response } from 'express'
import servico from '../Domain/Comandos/ComandoUsuario';
import IPaginacao from '../Domain/Interfaces/Paginacao';
import { Usuario } from '../Domain/Interfaces/Usuario';

const routerUsuario = Router();


// routerClientes.get("/clientes", async (req: Request, res: Response) => {
//   const paginacao = req.query
//   const comando = await servico.comandoClienteBuscar({
//     skip: Number(paginacao.skip) ? Number(paginacao.skip) : 0,
//     take: Number(paginacao.take) ? Number(paginacao.take) : 10
//   } as IPaginacao)
//   res.send({ comando })
// })

routerUsuario.post("/cadastro", async (req: Request, res: Response) => {
  const usuario: Usuario = req.body as Usuario;
  if(!typeof usuario){
    res.send().status(500)
  }
  const comando = await servico.comandoCadastrarUsuario(usuario)
  res.send(comando)
})

// routerClientes.delete("/clientes/:id", async (req: Request, res: Response) => {
//   const id = req.body.id
//   const comando = await servico.comandoClienteDelete(id)
//   res.send({ comando })
// })




export default routerUsuario;