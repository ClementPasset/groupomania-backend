const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const sequelize = require('./sequelize');
require('dotenv').config();

const app = express();

module.exports = app;