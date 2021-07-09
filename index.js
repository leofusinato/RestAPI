const express = require('express');
let routeHome = require('./routes/home');
let routeContato = require('./routes/contato')
let routeUsuario = require('./routes/usuario')
let routeCompromisso = require('./routes/compromisso')

const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routeHome);
app.use(routeContato);
app.use(routeUsuario);
app.use(routeCompromisso);

app.listen(4000, '127.0.0.1', () => {
    console.log('Servidor rodando');
})