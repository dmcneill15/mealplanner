import mongoose from "mongoose";

const { Schema } = mongoose;

const mealPlanSchema = new Schema({
    date: { type: Date, required: true },
    recipe_id: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    //category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: {type: String, required: true}
}, { timestamps: true });

export default mongoose.model("MealPlan", mealPlanSchema);

//Question: what is the timestamp here:
//timestamps : true - automatically adds the fields for createdAt and updatedAt