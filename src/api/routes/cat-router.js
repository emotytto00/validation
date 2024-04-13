import express from 'express';
import { createThumbnail } from '../middlewares.js';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/').get(getCat).post(postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

catRouter.route('/').post(upload.single('image'), createThumbnail, postCat);

export default catRouter;
