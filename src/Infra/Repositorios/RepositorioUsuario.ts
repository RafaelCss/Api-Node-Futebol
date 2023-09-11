import { Usuario } from '../../Domain/Interfaces/Usuario';
import { Repository } from '../../Domain/Interfaces/Repositorio';

import { RespostaBanco } from '../../Domain/Interfaces/RespostaBanco';
import { PrismaClient } from '@prisma/client';

class UsuarioRepository implements Repository<Usuario> {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private async Conectar() {
    await this.prisma.$connect();
  }

  private async Desconectar() {
    await this.prisma.$disconnect();
  }

  async Criar(data: Usuario): Promise<RespostaBanco<Usuario>> {
    await this.Conectar();
    const userExiste = await this.prisma.user
      .findFirst({
        where: {
          email: data?.email
        },
        select: {
          id: true
        }
      })
      .catch((err: any) => console.log(err));

      console.log(userExiste)
    if (userExiste) {
      return {
        sucesso: false,
        dados: [],
        message: 'Email já cadastrado '
      };
    }
    const salvarUsuario = await this.prisma.user.create({
      data: {
        email: data.email,
        nome: data.nome,
        senha: data.senha
      },
      select: {
        id: true
      }
    });
    await this.Desconectar();
    return {
      sucesso: true,
      dados: [{ id: salvarUsuario.id }] as any
    };
  }
}

export default UsuarioRepository;
