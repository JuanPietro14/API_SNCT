// requisição do express
const express = require('express');

// Criação da aplicação express
const app = express();

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Configuração do middleware para aceitar JSON
app.use(express.json());

// Importar as rotas da API
const dataRoutes = require('./routes/dataRoutes');
app.use('/api', dataRoutes);

// Adicionar uma rota para a URL raiz '/'
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
