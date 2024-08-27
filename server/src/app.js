const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const lawyerRouter = require('./routes/lawyerRouter');
const authRouter = require('./routes/authRouter');
const tokenRouter = require('./routes/token.router');
const casesRouter = require('./routes/casesRouter');



const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
     

app.use('/api/lawyer', lawyerRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/cases', casesRouter);

module.exports = app;