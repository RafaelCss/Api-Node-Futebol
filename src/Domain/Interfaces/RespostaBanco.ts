export interface RespostaBanco<T> {
  sucesso: boolean,
  dados?: T[],
  message ?: string
}