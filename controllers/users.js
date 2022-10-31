const mongoose = require('mongoose');
const Users = require('../models/user');
const {
  NOT_FOUND, CAST_ERROR, Err400, Err404, Err500,
} = require('../constants');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((user) => res.send(user))
    .catch(() => res.status(Err500).send({ message: 'Произошла ошибка' }));
};
module.exports.getUser = (req, res) => {
  Users.findById(req.params.userId)
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res.status(Err400).send({
          message: 'Переданы некорректные данные при поиске пользователя',
        });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(Err404)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.createUser = (req, res) => {
  Users.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(Err400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.editUser = (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(Err400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(Err404)
          .send({ message: 'Пользователь с указанным id не найден' });
      }
      return res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.editAvatar = (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({
          message: ' Переданы некорректные данные при обновлении аватара',
        });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(Err404)
          .send({ message: 'Пользователь с указанным id не найден' });
      }
      return res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};
