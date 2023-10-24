import jwt,{ VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      usuario?: JwtPayload; // Isso permite adicionar a propriedade 'usuario' ao objeto de solicitação
    }
  }
}


function ValidarToken(req: Request, res: Response, next: NextFunction){
    const secret = process.env.SECRETJWT as string;
    const token = req.headers.authorization as string;
    console.log(token)
    if (!token) {
      return res.status(401).json({ mensagem: 'Token não fornecido' });
    }
    jwt.verify(token.split(' ')[1], secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ mensagem: 'Token inválido' });
      }
      req.usuario = decoded;
      next();
    });
}


export default ValidarToken;