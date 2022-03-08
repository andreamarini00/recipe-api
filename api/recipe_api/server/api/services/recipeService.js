import CustomError from '../../common/customError';
import mongoose from '../../mongoose';

/** Esegue la query per ricercare tutte le ricette presenti
 * @param query - query parameter passati per eventuali filtri
 */
export async function ritornaTutteLeRicette(query) {
  try {
    const filter = {};
    if (query.name) {
      filter.name = { $regex: `.*${query.name}.*` };
    }
    const response = await mongoose.models.Recipe
      .find(filter)
      .skip(query.offset)
      .limit(query.limit);
    return response;
  } catch (error) {
    throw error.message;
  }
}

/** Esegue la creazione di una nuova ricetta
 * @param body - body contenente la ricetta da inserire
 */
export async function creaRicetta(body) {
  try {
    const response = await mongoose.models.Recipe.create(body);
    return response;
  } catch (error) {
    throw error.message;
  }
}

/** Esegue la modifica degli ingredienti della ricetta selezionata
 * @param id - id della ricetta da modificare
 * @param body - body contenente la lista degli ingredienti
 */
export async function modificaIngredientiRicetta(id, body) {
  try {
    const response = await mongoose.models.Recipe.findByIdAndUpdate(id, body);
    if (response) return response;
    throw new CustomError('Ricetta non esistente');
  } catch (error) {
    throw error.message;
  }
}

/** Esegue la cancellazione della ricetta selezionata
 * @param id - id della ricetta da eliminare
 */
export async function cancellaRicetta(id) {
  try {
    const response = await mongoose.models.Recipe.findByIdAndDelete(id);
    if (response) return response;
    throw new CustomError('Ricetta non esistente');
  } catch (error) {
    throw error.message;
  }
}
