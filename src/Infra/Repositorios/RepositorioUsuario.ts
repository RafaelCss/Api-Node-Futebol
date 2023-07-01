
import { Usuario } from '../../Domain/Interfaces/Usuario';
import { Repository } from '../../Domain/Interfaces/Repositorio';
import prisma from './ClientPrisma';
import { RespostaBanco } from '../../Domain/Interfaces/RespostaBanco';


class UsuarioRepository implements Repository<Usuario> {
  async Criar(data: Usuario): Promise<RespostaBanco<Usuario>> {
    await prisma.$connect()

    const userExiste = await prisma.user.findFirst({
      where: {
        email: data?.email
      },
      select: {
        id: true,
      }
    }).catch((err: any) =>
      console.log(err)
    )

    if (userExiste) {
      return {
        sucesso: false,
        dados: [],
        message: 'Email já cadastrado '
      }
    }
    const salvarUsuario = await prisma.user.create({
      data: {
        email: data.email,
        nome: data.nome,
        senha: data.senha,
      }, select: {
        id: true
      }
    })

    await prisma.$disconnect()
    return {
      sucesso: true,
      dados: [{ id: salvarUsuario.id }] as any
    }
  }

}


export default UsuarioRepository;

