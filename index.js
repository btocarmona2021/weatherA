import express from 'express'
import {router} from "./routes/rutas.js";
import cors from 'cors';
const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'https://weathera-production.up.railway.app' // Dominio de tu frontend
}));
app.use(express.static('public'));
app.use(express.json());

app.use('/',router);

app.listen(PORT, (error) => {
    if (error) {
        console.log('Ha ocurrido un error al intentar iniciar el servidor')
    } else {
        console.log(`Servidor Iniciado correctamente en el puerto ${PORT}`)
    }
})
