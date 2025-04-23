import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });

import db from './database/db.js';
import { app } from './app.js';

// Validate required environment variables
const requiredEnvVars = ['PORT', 'MONGODB_URL', 'DB_NAME'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    process.exit(1);
}

console.log(`Connecting to database: ${process.env.DB_NAME}`);
console.log("Current working directory:", process.cwd());

// Enhanced database connection and server startup
db()
.then(() => {
    const port = process.env.PORT || 8000;
    const server = app.listen(port, () => {
        console.log(`⚙️ Server is running on port: ${port}`);
    });

    // Handle server errors
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use`);
        } else {
            console.error('Server error:', error);
        }
        process.exit(1);
    });
})
.catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
});
