import express from "express";
import { mealPlanController } from "../controllers/index.js"; // Adjust the path as necessary

const router = express.Router();

// Add a recipe to the meal plan
router.post('/add', (req, res) => {
    mealPlanController.addRecipetToMealPlan(req, res);
});

// Fetch all user recipes
router.get('/:user_id', (req, res) => {
    mealPlanController.getUserMealPlan(req, res);
});

export default router;