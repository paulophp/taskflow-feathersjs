'use strict';

// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String },
  google: { type: Schema.Types.Mixed },

  img: { type: String },
  syspid: { type: String },

  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },

  grupo:  { type: String, 'default':'dev', required: true },
  status: { type: String, 'default':'ativo', required: true },

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
