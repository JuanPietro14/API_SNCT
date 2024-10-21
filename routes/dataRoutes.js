const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || "sql10.freesqldatabase.com",
    user: process.env.DB_USER || "sql10739470",
    password: process.env.DB_PASSWORD || "l7cTXGSlBW",
    database: process.env.DB_NAME || "sql10739470",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create the table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS dados_climaticos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperatura FLOAT NOT NULL,
    umidade FLOAT NOT NULL,
    pressao_atmosferica FLOAT NOT NULL,
    data_hora DATETIME NOT NULL
)
`;

// Execute the create table query on startup
pool.query(createTableQuery, (err) => {
    if (err) {
        console.error("Erro ao criar tabela:", err);
    } else {
        console.log("Tabela 'dados_climaticos' verificada/criada com sucesso.");
    }
});

// Variable to store sensor data
let sensorData = {};

// Endpoint to receive data from ESP32
router.post("/data", (req, res) => {
    sensorData = req.body; // Store the received data
    console.log("Dados recebidos:", sensorData);

    // Validate incoming data
    const { temperatura, umidade, pressao } = sensorData;
    if (typeof temperatura !== 'number' || typeof umidade !== 'number' || typeof pressao !== 'number') {
        return res.status(400).json({ message: "Dados inválidos" });
    }

    const data_hora = new Date();

    const query = "INSERT INTO dados_climaticos (temperatura, umidade, pressao_atmosferica, data_hora) VALUES (?, ?, ?, ?)";
    pool.query(query, [temperatura, umidade, pressao, data_hora], (err, results) => {
        if (err) {
            console.error("Erro ao inserir dados:", err);
            return res.status(500).json({ message: "Erro ao inserir dados no banco de dados" });
        }
        res.status(200).json({ message: "Dados recebidos e armazenados com sucesso" });
    });
});

// Endpoint to send sensor data
router.get("/sensordata", (req, res) => {
    console.log("Dados enviados:", sensorData);
    res.json(sensorData); // Return the stored data as JSON
});

// Endpoint to fetch climate data
router.get("/historico", (req, res) => {
    console.log("Received request for /historico"); // Debug log
    const query = "SELECT data_hora, temperatura, umidade, pressao_atmosferica FROM dados_climaticos ORDER BY data_hora DESC";

    pool.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar dados:", err); // Log the error object
            console.error("Erro ao buscar dados:", err.stack); // Log the error stack
            return res.status(500).json({ message: "Erro ao buscar dados do banco de dados" });
        }
        res.json(results); // Return the results as JSON
    });
});

// Export the router module for other files
module.exports = router;

