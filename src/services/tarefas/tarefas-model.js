'use strict';

// tarefas-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tarefasSchema = new Schema({
  nome: { type: String, required: true },
  text: { type: String, required: true },
  usuario_id: { type: String, required: true },
  projeto_id: { type: String, required: true },
  cliente_id: { type: String, required: true },
  tempo: { type: String },
  tempo_gasto: { type: String },
  progress: { type: Object },
  status: { type: String, 'default': 'NEW'  },
  start: { type: Boolean, 'default': false },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const tarefasModel = mongoose.model('tarefas', tarefasSchema);

module.exports = tarefasModel;
