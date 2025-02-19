import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import db_connection from './db/db_connection.js'

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.listen(5050, ()=>{
    console.log("Listening at PORT 5050!");
})
db_connection();

app.get('/', (req, res)=>{
   res.send("Hi, User!");
})

// Routes
app.use('/users', userRoutes);