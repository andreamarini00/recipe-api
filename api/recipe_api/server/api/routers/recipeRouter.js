import * as express from 'express';
import logger from '../../common/logger';
import * as controller from '../controllers/recipeController';

export default express
  .Router().use((req, res, next) => {
    logger.info(`nome: Recipe API; method: ${req.method}; query:${JSON.stringify(req.query)}`);
    next();
  })
  .get('/', controller.ritornaTutteLeRicette)
  .post('/', controller.creaRicetta)
  .patch('/:id', controller.modificaIngredientiRicetta)
  .delete('/:id', controller.cancellaRicetta);
