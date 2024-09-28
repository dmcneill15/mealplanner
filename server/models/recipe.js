import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema({
    recipe_id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    recipe_title: { type: String, trim: true, required: true,  unique: true },
    method: { type: String },
    servings: {type : Number},
    image_url: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key to User model
});

export default mongoose.model("Recipe", recipeSchema);

/*//Dummy data to build the recipes view
let recipes = [
    {
        recipe_id: 1,
        recipe_title: 'Spag Bol',
        method: 'Chop onions, carrots and celery. Fry until soft. Add the remaining ingredients and cook until rich and delicious. Cook pasta according to packet instructions. Serve with fresh basil and grated cheese.',
        servings: 4,
        image: '#',
    },
    {
        recipe_id: 2,
        recipe_title: 'Pizza',
        method: 'The best pizza recipe here',
        servings: 4,
        image: '#',
    },
    {
        recipe_id: 3,
        recipe_title: 'Roast chicken',
        method: 'Best recipe for roast chicken here',
        servings: 4,
        image: '#',
    }
] */