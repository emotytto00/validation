import {addUser, findUserById, listAllUsers} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  res.sendStatus(200);
  res.json({message: 'User item updated.'});
};

const deleteUser = (req, res) => {
  res.sendStatus(200);
  res.json({message: 'User item deleted.'});
};

export {getUser, getUserById, postUser, putUser, deleteUser};
