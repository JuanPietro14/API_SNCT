const express = require('express')
const router = express.Router();




// Simular dados dos sensores
router.get('/sensordata', (req, res) => {
    const sensorData = {
        temperatura: 25, // Aqui você pode conectar com dados reais
        pressao: 1012,
        umidade: 65
    };
    res.json(sensorData); // Retorna os dados em formato JSON
});

//exporta o modulo router para outros aqrqivos
module.exports = router;