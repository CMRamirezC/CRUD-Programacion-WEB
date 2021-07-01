'use strict'

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hbs = require('express-handlebars');
const router = require('./routers/routes');

const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Motor de vistas
app.engine('.hbs', hbs({
    defaultLayout : 'index', 
    extname : '.hbs'
}));
app.set('view engine', '.hbs');

//Recursos publicos
app.use('/static', express.static('public'));

//Router out app
app.use('/', router);

//Conexion a la base de datos
mongoose.connect(config.db, config.urlParser, (err, res)=>{
    if(err){
        return console.log(`Error al conectar en la base de datos ${err}`);
    }
    console.log('Conexión a la base de datos exitosa');
    app.listen(config.port, ()=>{
        console.log(`Ejecutando en http://localhost:${config.port}`);
    });
});