import express from 'express';
import { getAllCats, getCatById, addCat, updateCat, deleteCat } from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/').get(getAllCats);

catRouter.route('/:id').get(getCatById);

catRouter.route('/').post(addCat);

catRouter.route('/:id').put(updateCat);

catRouter.route('/:id').delete(deleteCat);

export default catRouter;
