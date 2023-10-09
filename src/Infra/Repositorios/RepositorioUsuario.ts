import { LoginUsuario, Usuario } from '../../Domain/Interfaces/Usuario';
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

    if (userExiste) {
      await this.Desconectar();
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
        senha: data.senha as string
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

  async BuscarUsuario(usuario: LoginUsuario): Promise<Usuario | null> {
    await this.Conectar();
    const userExiste = await this.prisma.user
      .findFirst({
        where: {
          email: usuario?.email,
          senha: usuario?.senha
        },
        select: {
          id: true,
          email: true,
          nome: true
        }
      })
      .catch((err: any) => console.log(err));
    if (userExiste) {
      await this.Desconectar();
      return userExiste;
    }
    await this.Desconectar();
    return userExiste as null;
  }
}

export default UsuarioRepository;
