const express = require('express');
const helmet = require('helmet'); // For security
const cors = require('cors'); // For CORS
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for security
app.use(helmet());

// Middleware to enable CORS
app.use(cors());

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to accept JSON
app.use(express.json());

// Import API routes
const dataRoutes = require('./routes/dataRoutes');
app.use('/api', dataRoutes);

// Route for the root URL '/'
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Initialize the server
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Servidor encerrado.');
        process.exit(0);
    });
});
