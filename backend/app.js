const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const urlValidator = require('./constants');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = 3000;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb ', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(cors());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlValidator),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);
app.use(() => {
  throw new NotFoundError('Введён несуществующий адрес');
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {//eslint-disable-line
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
});
