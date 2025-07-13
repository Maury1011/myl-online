import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import { mostrarCartas } from './controllers/cartas.controller.js';
import { userRegister } from './controllers/user.register.js';
import { obtenerMazos } from './controllers/mazos.controller.js';
import { userLogin } from './controllers/user.login.js';
import { createMazo } from './controllers/create.mazo.js';
import { añadirCarta } from './controllers/añadirCarta.js';
import { deleteMazo } from './controllers/deleteMazo.js';
import { deleteCarta } from './controllers/deleteCarta.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'clave-super-secreta', // Cambia esto por algo más seguro
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Usa `true` si estás en HTTPS
}));

// Configura el directorio público para archivos estáticos
app.use(express.static('public'));
app.use('/imagenesWEBP2', express.static('imagenesWEBP2'));
app.use('/imagenesWEBP1', express.static('imagenesWEBP1'));

// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Ruta para obtener todas las cartas y renderizar la vista
app.get('/', mostrarCartas);
app.post ('/register', userRegister);
app.post ('/login', userLogin); // Cambia esto si tienes una ruta diferente para logi
app.get ('/mazos', obtenerMazos)
app.post ('/createMazo', createMazo); // Cambia esto si tienes una ruta diferente para crear mazos
app.post ('/anadirCarta', añadirCarta); // Cambia esto si tienes una ruta diferente para añadir cartas a mazos
app.post ('/deleteMazo', deleteMazo); // Cambia esto si tienes una ruta diferente para eliminar mazos
app.post ('/deleteCarta', deleteCarta); // Cambia esto si tienes una ruta diferente para eliminar cartas de mazos
// Función para iniciar el servidor después de la conexión a la base de datos
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
