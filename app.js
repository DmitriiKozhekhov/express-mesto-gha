const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
const { validationOfAuth } = require('./middlewares/reqValidation');

const NotFound = require('./errors/NotFound');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', validationOfAuth, login);
app.post('/signup', validationOfAuth, createUser);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(auth);
app.use((req, res, next) => next(new NotFound('Некорректный адрес запроса')));

app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT);
