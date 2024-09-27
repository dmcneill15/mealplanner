import express from "express";
import { mealPlanController } from "../controllers/index.js"; // Adjust the path as necessary

const router = express.Router();

// Adds a GET route to return all recipes
router.post('/mealplans', (req, res) => {
    mealPlanController.getMealPlan(req, res);
});

/*
Using POST for getMealPlans becuase we need to set query parameters.
GET can only send query parameters through the header or url which can be messy
POST can send query parameters through the request body which makes things tidier
{
    "user_id": "66e7dcfd1111468702d30d68", // Replace with actual user_id
    "startDate": "2024-09-01",
    "endDate": "2024-09-30"
}*/

// Adds a POST route to create a new meal plan
router.post('/create', (req, res) => {
    mealPlanController.createMealPlan(req, res);
});

/*{
    "email_id": "john@user.com",
    "recipe_id": "66e7f9b45c2c08ca8e85aead",
    "category_id": "66e7f9b45c2c08ca8e85aeac",
    "date": "2024-09-20"
}*/


export default router;