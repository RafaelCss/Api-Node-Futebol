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
  const secret = process.env.SECRETJWT as string;
  const token = jwt.sign(dados, secret, {
    algorithm: 'RS256',
    expiresIn: 3600
  });

    console.log(token)
  return token;
}

export { gerarToken };
