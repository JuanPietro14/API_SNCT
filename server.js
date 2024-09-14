
//aqui haverá a requisição do js para a biblioteca express. vai facilitar o desenvolvimento do cod
const express = require('express');

//aqui haverá a requisição com o bd. mysql2 é a biblioteca para node q configura um bd
//const mysql = require('mysql2');


//require ('dotenv').config();

//cria o app express para rodar o servidor
const app = express();

//definirá a porta que alocará o server
const PORT = 3000;

//const db = mysql.createCOnnection({})

//vai configurar o middleware express. irá converter as requisições json para js
app.use(express.json());

//vai importar as rotas no servidor
const dataRoutes = require('./routes/dataRoutes');
app.use('/api', dataRoutes);

//coloca o server em funcionamento na porta especificada
app.listen(PORT, () => {
    console.log('Servidor rodando na porta ${PORT}');
});