export interface Repository<T> {
  criar(data: T) : any;
  buscarPorId(id: string): Promise<T | null>;
  editar(id: string, data: T): Promise<T | null>;
  delete(id: string): any;
  findMany(query?: object) : any;
}
