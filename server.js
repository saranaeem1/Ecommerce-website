import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import http from 'http'; 
import portfinder from 'portfinder';
import cors from 'cors';

//config env
dotenv.config();

//database config
connectDB();
//rest object
const app= express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/feedback", feedbackRoutes);


//rest api
app.get('/', (req,res)=>{
    res.send({
        message:'welcome',
    })
})



// Dynamically find an available port using portfinder
portfinder.getPortPromise()
    .then(port => {
        // Create HTTP server
        http.createServer(app).listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error finding an available port:', err);
    });
