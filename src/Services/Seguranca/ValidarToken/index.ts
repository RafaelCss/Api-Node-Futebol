import jwt from 'jsonwebtoken';

function validarToken(token : string){
    const secret = process.env.SECRETJWT as string;
    try {
        const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
        console.log(decoded);
      } catch (error) {
        console.error('A verificação do JWT falhou:', error);
      }
}