import { RespostaBanco } from "./RespostaBanco";
import {Retorno} from "./Retorno";

export interface Repository<T> {
  Criar?(data: T): Promise<boolean | RespostaBanco<T>>;
  BuscarPorId?(id: string): Retorno<T>;
  Editar?(id: string, data: T): Retorno<T>;
  Delete?(id: string): any;
  FindMany?(query?: object): any;
}
