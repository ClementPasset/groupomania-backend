const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const sequelize = require('./sequelize');
require('dotenv').config();

const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/user/', userRoutes);
app.use('/api/post/:postId/comment/', commentRoutes);
app.use('/api/post/', postRoutes);

module.exports = app;