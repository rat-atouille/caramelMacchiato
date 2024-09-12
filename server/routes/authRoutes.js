const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const session = require('express-session');
const router = express.Router();

