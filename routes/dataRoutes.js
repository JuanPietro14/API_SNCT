const express = require('express');
const router = express.Router();

// Variável para armazenar dados dos sensores
let sensorData = {};

// Endpoint para receber dados do ESP32
router.post('/data', (req, res) => {
    sensorData = req.body; // Armazena os dados recebidos
    console.log('Dados recebidos:', sensorData);
    res.status(200).json({ message: 'Dados recebidos com sucesso' });
});

// Endpoint para enviar os dados do sensor
router.get('/sensordata', (req, res) => {
    console.log('Dados enviados:', sensorData);
    res.json(sensorData); // Retorna os dados armazenados em formato JSON
});

// Exporta o módulo router para outros arquivos
module.exports = router;