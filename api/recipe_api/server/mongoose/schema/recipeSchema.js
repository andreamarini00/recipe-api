import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: String,
  ingredients: [String],
  image: String,
}, { collection: 'recipe' });

export default recipeSchema;
