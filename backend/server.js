import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to the Blog API');
})

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));
