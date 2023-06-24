
import { Cliente } from '../../Domain/Interfaces/Cliente';
import IPaginacao from '../../Domain/Interfaces/Paginacao';
import { Repository } from '../../Domain/Interfaces/Repositorio';
import Retorno from '../../Domain/Interfaces/Retorno';
import { PrismaClient } from "@prisma/client";


class TabelaRepository implements Repository<Retorno<Cliente>> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //#region TODO: Buscar clientes
  async findMany(query?: IPaginacao | undefined): Promise<Retorno<any>> {
    // await this.criar()
    await this.prisma.$connect()
    const total = await this.prisma.tabela.count()

    const clientes = await this.prisma.tabela.findMany()
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

  private async desconectar() {
    await this.prisma.$disconnect();
  }

}


export default TabelaRepository;

