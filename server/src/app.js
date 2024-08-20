const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const lawyerRouter = require('./routes/lawyerRouter');
const authRouter = require('./routes/authRouter');
const tokenRouter = require('./routes/token.router');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/server/photo', express.static('server/photo'));
     

app.use('/api/lawyer', lawyerRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);

module.exports = app;