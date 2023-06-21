import express from "express";
import cors from "cors"
import routerLogin from "./src/Controllers/LoginController";
import routerUsuarios from "./src/Controllers/UsuariosController";
import routerGatos from "./src/Controllers/GatosController";
import routerClientes from "./src/Controllers/ClientesController";



const app = express();


app.use(cors({origin:"*"}))
app.use(express.json());
app.use("/api",routerLogin)
app.use("/api",routerUsuarios)
app.use("/api", routerGatos)
app.use("/api", routerClientes)

const port = process.env.PORT_SERVER || 3001

app.listen(port,() =>{
  console.log(`Você está conectado na porta ${port}`)
})

