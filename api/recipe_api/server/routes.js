import recipeRouter from './api/routers/recipeRouter';

export default function routes(app) {
  app.use('/api/v1/recipe', recipeRouter);
}
