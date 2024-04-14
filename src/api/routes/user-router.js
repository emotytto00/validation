import { body } from 'express-validator';

userRouter.route('/').post(
  body('email').trim().isEmail(),
  body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body('password').trim().isLength({ min: 8 }),
  validationErrors,
  postUser
);
