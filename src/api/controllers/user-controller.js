import { addUser } from '../models/user-model.js';
import { validationResult } from 'express-validator';

const postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUserId = await addUser(req.body);
    res.json({ message: 'new user added', user_id: newUserId });
  } catch (err) {
    next(err);
  }
};

export { postUser };
