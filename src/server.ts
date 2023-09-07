import express from "express";
import { Request, Response } from 'express'
import cors from "cors"
import routerLogin from "./Controllers/LoginController";
import routerUsuario from "./Controllers/UsuarioController";
import tabelaCampeonato from "./Controllers/TabelaCampeonato";
import cron from 'node-cron';
import { salvarDadosTabelaNoDataBase } from "./Infra/MongoDb";
import buscarDadosTabelaCampeonato from "./Services/ServicesExternos/jobTabela";

const app = express();


app.use(cors({ origin: "*" }))
app.use(express.json());
app.use("/api", routerLogin)
app.use("/api", routerUsuario)
app.use("/api", tabelaCampeonato)

const port = process.env.PORT_SERVER || 3001

app.get("/", async (_req: Request, res: Response) => {
  res.send({ "msg": "você está conectado" })
})



cron.schedule('0 10,18  * * *', async () => {
  try { 
    await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
    console.log('Job executado com sucesso');
    console.log(new Date());
  } catch (error) {
    console.error('Erro ao executar o job:', error);
  }
});
// cron.schedule('* * * * *', async () => {
//   try {
//     await salvarDadosTabelaNoDataBase(await buscarDadosTabelaCampeonato());
//     console.log('Job executado com sucesso');
//     console.log(new Date());
//   } catch (error) {
//     console.error('Erro ao executar o job:', error);
//   }
// });
app.listen(port, () => {
  console.log(`Você está conectado na porta ${port}`)
})

