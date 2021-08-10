const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const sequelize = require('./sequelize');
require('dotenv').config();

const app = express();

const userRoutes = require('./routes/user');

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/user/', userRoutes);

module.exports = app;