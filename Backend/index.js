import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import db_connection from './db/db_connection.js';

dotenv.config();
const app = express();

// ✅ CORS Middleware (Place it at the top)
app.use(cors({
    origin: "https://w3villa-task-manager-web-app-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Fix incorrect syntax
    credentials: true
}));

// ✅ Other Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to DB
db_connection();

// ✅ Routes
app.get('/', (req, res) => {
    res.send("Hi, User!");
});
app.use('/users', userRoutes);

// ✅ Use Environment Port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}!`);
});
