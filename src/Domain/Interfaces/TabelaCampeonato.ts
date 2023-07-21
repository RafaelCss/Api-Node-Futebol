
export interface TabelaViewModel {
  id: string;
  posicao: number;
  pontos: number;
  time: Time;
  ultimosJogos: UltimosJogos[];
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
  aproveitamento: number;
  variacaoPosicao: number;
}

interface Time {
  time_id: number;
  nomePopular: string;
  sigla: string;
  escudo: string;
}

interface UltimosJogos {
  resultados: string[];
}

declare class ObjectId {
  constructor(hexString: string);
  toHexString(): string;
  // Adicione outros métodos/propriedades do ObjectId, se necessário
}