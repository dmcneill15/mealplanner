'use strict';
import mongoose from 'mongoose';

// if the connection fails, try 127.0.0.1 instead of localhost below
const uri = process.env.DB_URI || "mongodb://localhost/mealplannerDB";

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected: ' + uri))
    .catch(error => console.log('MongoDB Error: ' + error.message));

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default { mongoose };