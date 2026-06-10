import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js'
import Bus_servies from './Routes/Bus_servies.js'
dotenv.config()
const app = express();
const port = 3000;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174'
    ];

    app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

app.use('/getBuses',Bus_servies)

connectDB();

app.listen(port,()=>{
        console.log(`Server is running on the port http://localhost:${port}`);
})