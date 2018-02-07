'use strict';

// time-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
  tarefa_id: { type: String, required: true },
  cliente_id: { type: String },
  projeto_id: { type: String },
  usuario_id: { type: String },
  status: { type: String, 'default': 'OPEN' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const timeModel = mongoose.model('time', timeSchema);

module.exports = timeModel;
