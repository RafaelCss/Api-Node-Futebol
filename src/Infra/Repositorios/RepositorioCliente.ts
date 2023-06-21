
import { Cliente } from '../../Domain/Interfaces/Cliente';
import IPaginacao from '../../Domain/Interfaces/Paginacao';
import { Repository } from '../../Domain/Interfaces/Repositorio';
import Retorno from '../../Domain/Interfaces/Retorno';
import { PrismaClient } from "@prisma/client";


class ClienteRepository implements Repository<Retorno<Cliente>> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //#region TODO: Criar um cliente
  async criar(data: Cliente) {
    await this.prisma.$connect()
    const cliente = await this.prisma.cliente.create({
      data: {
        cpf: data.cpf,
        email: data.email,
        nome: data.nome,
        telefone: data.telefone,
        endereco: {
          create:
          {
            bairro: data.endereco?.bairro as string || '',
            cidade: data.endereco?.cidade as string || "",
            rua: data.endereco?.rua as string || "",
          },

        }
      }
    })
    const returnUser = await this.prisma.cliente.findUnique({
      where: {
        id: cliente.id,
      },
      include: {
        endereco: true
      },
    })
    this.desconectar()
    return returnUser?.id;
  }
  //#endregion


  //#region TODO: Buscar clientes
  async findMany(query?: IPaginacao | undefined): Promise<Retorno<any>> {
    await this.prisma.$connect()
    const total = await this.prisma.cliente.count()
    const skip = query && (query?.skip == 0 ? query?.skip + 1 : query?.skip - 1) * query.take

    const clientes = await this.prisma.cliente.findMany({
      include: {
        endereco: true,
      },
      skip: Number(skip),
      take: query?.take,
      orderBy: {
        nome: 'desc'
      },
    })
    const retorno: Retorno<any> = {
      dados: clientes,
      paginacao: {
        total,
        skip: Number(query?.skip),
        take: Number(query?.take)
      }
    }

    this.desconectar()
    return retorno
  }
  //#endregion


  // #region TODO: Deletar cliente
  async delete(id: string): Promise<Retorno<any>> {
    await this.prisma.$connect()
    const resultado = await this.prisma.cliente.delete({
      where: {
        id
      }
    }).catch((err: any) =>
      console.log(err)
    )
    await this.desconectar()
    return {
      id,
      erros: resultado as any,
      mensagem: "Cliente excluído com sucesso"
    }
  }
  //#endregion


  //#region TODO: Editar cliente
  async editar(id: string, data: Cliente): Promise<Retorno<Cliente>> {
    await this.prisma.$connect()
    let erro;
    const updateCliente = await this.prisma.cliente.update({
      where: {
        id
      },
      include: {
        endereco: true
      },
      data: {
        cpf: data.cpf,
        email: data.email,
        nome: data.nome,
        telefone: data.telefone,
        endereco: {
          update: {
            bairro: data.endereco?.bairro || '',
            cidade: data.endereco?.cidade || '',
            rua: data.endereco?.rua || ''
          }
        }
      },

    }).catch(
      (err: any) => erro = err as any
    )

    await this.desconectar()
    return {
      id,
      mensagem: "Cliente atualizado",
      erros: erro
    }
  }
  //#endregion


  async buscarPorId(id: string): Promise<Cliente | null> {
    throw new Error('Method not implemented.');
  }


  private async desconectar() {
    await this.prisma.$disconnect();
  }

}


export default ClienteRepository;

