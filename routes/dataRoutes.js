const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

//DEPLOY
const db = mysql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "sql10739470",
    password: "l7cTXGSlBW",
    database: "sql10739470",
});

//LOCAL
// const db = mysql.createConnection({
//     host: "localhost", // Altere se necessário
//     user: "root", // Altere para seu usuário do MySQL
//     password: "", // Altere para sua senha do MySQL
//     database: "monitoramento_clima", // Nome do banco de dados
// });

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log("Conectado ao banco de dados MySQL");
});

// Variável para armazenar dados dos sensores
let sensorData = {};

// Endpoint para receber dados do ESP32
router.post("/data", (req, res) => {
    sensorData = req.body; // Armazena os dados recebidos
    console.log("Dados recebidos:", sensorData);

    // Insere os dados no banco de dados
    const { temperatura, umidade, pressao } = sensorData;
    const data_hora = new Date(); // Obtém a data e hora atual

    const query =
        "INSERT INTO dados_climaticos (temperatura, umidade, pressao_atmosferica, data_hora) VALUES (?, ?, ?, ?)";
    db.query(query, [temperatura, umidade, pressao, data_hora], (err, results) => {
        if (err) {
            console.error("Erro ao inserir dados:", err);
            return res.status(500).json({ message: "Erro ao inserir dados no banco de dados" });
        }
        res.status(200).json({ message: "Dados recebidos e armazenados com sucesso" });
    });
});

// Endpoint para enviar os dados do sensor
router.get("/sensordata", (req, res) => {
    console.log("Dados enviados:", sensorData);
    res.json(sensorData); // Retorna os dados armazenados em formato JSON
});

// Exporta o módulo router para outros arquivos
module.exports = router;
