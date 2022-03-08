import mongoose from 'mongoose';
import recipeSchema from './schema/recipeSchema';

mongoose.connect(process.env.URL_MONGO);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default {
  mongoose,
  models: {
    Recipe,
  },
};
