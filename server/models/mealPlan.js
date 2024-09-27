import mongoose from "mongoose";

const { Schema } = mongoose;

const mealPlanSchema = new Schema({
    date: { type: Date, required: true },
    recipe_id: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("MealPlan", mealPlanSchema);


/*
{
    "recipe_id": "66e7fc5921c72b4dc5687b7f",
    "category_id": "66e93df060fc78c44a39de3e",
    "user_id": "john@user.com"
}*/