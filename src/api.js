const express = require('express');
require('express-async-errors');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const postsRouter = require('./routers/postsRouter');

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/user', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postsRouter);
app.use(errorMiddleware);

module.exports = app;
