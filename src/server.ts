import express from "express";
import { Router, Request, Response } from 'express'
import cors from "cors"
import routerLogin from "./Controllers/LoginController";
import routerClientes from "./Controllers/ClientesController";



const app = express();


app.use(cors({ origin: "*" }))
app.use(express.json());
app.use("/api", routerLogin)
app.use("/api", routerClientes)

const port = process.env.PORT_SERVER || 3001

app.get("/", async (_req: Request, res: Response) => {
  res.send({ "msg": "você está conectado" })
})

app.listen(port, () => {
  console.log(`Você está conectado na porta ${port}`)
})

