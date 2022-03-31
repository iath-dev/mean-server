import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path, { dirname } from 'path'

import AuthRouter from './routes/auth.js';
import dbConnection from './db/config.js';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT;

dbConnection();

// Public
app.use(express.static('public'))
// CORS
app.use(cors());

app.use(express.json());

// ROUTES
app.use('/api/auth', AuthRouter);

app.get('*', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    res.sendFile(path.resolve(__dirname.replace('\\src', ''), 'public/index.html'))
})

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`)
})