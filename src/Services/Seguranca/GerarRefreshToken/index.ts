import jwt from 'jsonwebtoken';

interface PropsToken {
  id: string;
  email: string;
  nome: string;
}



export async function gerarRefreshToken(dados: PropsToken): Promise<string> {
    const secret = process.env.SECRETJWT as string;
    const token = jwt.sign(dados, secret, {
      algorithm: 'HS256',
    });
    return token;
  }
  ;
  