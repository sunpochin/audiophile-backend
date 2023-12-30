// const mongoose = require('mongoose');
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// db.user = require("./user.model");
// db.role = require("./role.model");
import { User } from './user.model.js';
import { Role } from './role.model.js';

db.ROLES = ["user", "admin", "moderator"];

// module.exports = db;
export {
  db,
};
