import { LoginUsuario, Usuario } from '../../Domain/Interfaces/Usuario';
import { Repository } from '../../Domain/Interfaces/Repositorio';

import { RespostaBanco } from '../../Domain/Interfaces/RespostaBanco';
import { PrismaClient } from '@prisma/client';
import EncryptSenha from '../../Services/Seguranca/Senha';

const encryptSenha = new EncryptSenha();
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
    const senha = await encryptSenha.gerarSenha(data.senha as string);
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
        senha: senha
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
        },
        select: {
          id: true,
          email: true,
          senha: true,
          nome: true
        }
      })
      .catch((err: any) => console.log(err));
    const senhaValida = await encryptSenha.checkUser(usuario?.senha, userExiste?.senha as string);
    if (userExiste && senhaValida) {
      await this.Desconectar();
      return {
        id:userExiste.id,
        nome:userExiste.nome,
        email:userExiste.email
      };
    }
    await this.Desconectar();
    return userExiste as null;
  }

  async BuscarUsuarioPorEmail(usuario: LoginUsuario): Promise<Usuario | null> {
    await this.Conectar();
    const userExiste = await this.prisma.user
      .findFirst({
        where: {
          email: usuario?.email
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
