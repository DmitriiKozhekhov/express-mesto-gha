const { default: mongoose } = require('mongoose');
const Cards = require('../models/card');
const {
  NOT_FOUND, CAST_ERROR, Err400, Err404, Err500,
} = require('../constants');

module.exports.getCard = (req, res) => {
  Cards.find({})
    .then((card) => res.send(card))
    .catch(() => {
      res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(Err400)
          .send({
            message: 'Переданы некорректные данные при создании карточки',
          });
      }
      return res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .orFail(new Error(NOT_FOUND))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res
          .status(Err400)
          .send({ message: 'Переданы некорректные данные карточки' });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(Err404)
          .send({ message: 'Карточка с указанным id не найдена' });
      }
      return res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error(NOT_FOUND))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res
          .status(Err400)
          .send({
            message: 'Переданы некорректные данные для лайка',
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(Err404)
          .send({ message: 'Передан несуществующий id карточки' });
      }
      return res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error(NOT_FOUND))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res
          .status(Err400)
          .send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(Err404)
          .send({ message: 'Передан несуществующий id карточки' });
      }
      return res.status(Err500).send({ message: 'Произошла ошибка' });
    });
};
