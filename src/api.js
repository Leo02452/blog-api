const express = require('express');
require('express-async-errors');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/user', usersRouter);

app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
