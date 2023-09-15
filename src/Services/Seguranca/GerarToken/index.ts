import jwt from 'jsonwebtoken';

interface PropsToken {
  id: string;
  email: string;
  nome: string;
}

/*
    gerar token usuário
*/
function gerarToken(dados: PropsToken): string {
  const secret = process.env.SECRETJWT?.toString() as string;
  const token = jwt.sign(dados, secret, {
    algorithm: 'HS256',
    expiresIn: 3600
  });
  return token;
}

export default gerarToken ;
