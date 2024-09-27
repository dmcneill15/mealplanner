import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    category_name: { type: String, trim: true, required: true },
});

export default mongoose.model("Category", categorySchema);


/*
{
    "category_name": "Lunch",
}
{
    "category_name": "Dinner",
}
*/