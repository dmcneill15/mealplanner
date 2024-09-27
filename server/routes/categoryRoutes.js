import express from "express";
import { categoryController } from "../controllers/index.js"; // Adjust the path as necessary

const router = express.Router();

// Adds a GET route to return all recipes
router.get('/', (req, res) => {
    categoryController.getCategory(res);
});

// Adds a POST route to create a new recipe
router.post('/create', (req, res) => {
    categoryController.createCategory(req.body, res);
});

export default router;