import logger from '../../common/logger';
import * as RecipeService from '../services/recipeService';

export async function ritornaTutteLeRicette(req, res) {
  try {
    logger.info(`${req.baseUrl}: RecipeService.ritornaTutteLeRicette START`);
    const response = await RecipeService.ritornaTutteLeRicette(req.query);
    logger.info(`${req.baseUrl}: RecipeService.ritornaTutteLeRicette END`);
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
    logger.error(error, `${req.baseUrl}: RecipeService.ritornaTutteLeRicette`);
  }
}

export async function creaRicetta(req, res) {
  try {
    logger.info(`${req.baseUrl}: RecipeService.creaRicetta START`);
    const response = await RecipeService.creaRicetta(req.body);
    logger.info(`${req.baseUrl}: RecipeService.creaRicetta END`);
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
    logger.error(error, `${req.baseUrl}: RecipeService.creaRicetta`);
  }
}

export async function modificaIngredientiRicetta(req, res) {
  try {
    logger.info(`${req.baseUrl}: RecipeService.modificaIngredientiRicetta START`);
    const response = await RecipeService.modificaIngredientiRicetta(
      req.params.id,
      req.body,
    );
    logger.info(`${req.baseUrl}: RecipeService.modificaIngredientiRicetta END`);
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
    logger.error(error, `${req.baseUrl}: RecipeService.modificaIngredientiRicetta`);
  }
}

export async function cancellaRicetta(req, res) {
  try {
    logger.info(`${req.baseUrl}: RecipeService.cancellaRicetta START`);
    const response = await RecipeService.cancellaRicetta(req.params.id);
    logger.info(`${req.baseUrl}: RecipeService.cancellaRicetta END`);
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
    logger.error(error, `${req.baseUrl}: RecipeService.cancellaRicetta`);
  }
}
