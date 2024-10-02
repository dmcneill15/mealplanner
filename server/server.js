import dbConnect from "./dbConnect.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js'
import mealPlanRoutes from './routes/mealPlanRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

dotenv.config();

const app = express();
app.use(cors());        //stops cross origin errors

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json()); // Add this line to parse JSON bodies

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/mealplan', mealPlanRoutes); 
app.use('/api/category', categoryRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

