// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();

// const app = express();

// // Detailed CORS configuration
// app.use(cors({
//     origin: '*',  // In production, replace with specific origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
//     credentials: true,
//     preflightContinue: false,
//     optionsSuccessStatus: 204
// }));

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Basic error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something broke!' });
// });

// // Test route to verify server is running
// app.get('/test', (req, res) => {
//     res.json({ message: 'Server is running!' });
// });

// // Connect to database
// connectDB().then(() => {
//     console.log('Database connected successfully');
// }).catch(err => {
//     console.error('Database connection error:', err);
// });

// // Routes
// app.use('/api', require('./routes/auth'));

// // Handle 404 routes
// app.use((req, res) => {
//     res.status(404).json({ message: 'Route not found' });
// });

// // Start the server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`Server running at http://localhost:${PORT}`);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//     console.error('Uncaught Exception:', err);
//     process.exit(1);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//     console.error('Unhandled Rejection:', err);
//     process.exit(1);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(bodyParser.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Connect to database
connectDB();

// Routes
app.use('/api', require('./routes/auth'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Full server URL: http://10.10.237.165:${PORT}`);
});