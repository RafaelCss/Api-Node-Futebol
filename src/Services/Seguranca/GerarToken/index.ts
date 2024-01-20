import jwt from 'jsonwebtoken';

interface PropsToken {
  id: string;
  email: string;
  nome: string;
}

/*
    gerar token usuário
*/
export function gerarToken(dados: PropsToken): string {
  const secret = process.env.SECRETJWT as string;
  const token = jwt.sign(dados, secret, {
    algorithm: 'HS256',
    expiresIn: '15m' 
  });
  return token;
}

