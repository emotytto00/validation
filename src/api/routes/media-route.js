import { body } from 'express-validator';
import { upload } from '../../middlewares.js';

mediaRouter.route('/').post(
  authenticateToken,
  upload.single('file'),
  body('title').trim().isLength({ min: 3, max: 50 }),
  body('description').trim().isLength({ min: 3 }),
  body('owner').trim().isInt(),
  body('birthdate').trim().isISO8601(),
  validationErrors,
  postMedia
);
