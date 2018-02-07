'use strict';

// projetos-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetosSchema = new Schema({
  nome: { type: String, required: true },
  horas_dia: { type: Number },
  cliente_id: { type: String, required: false },
  progress: { type: Object },
  text: { type: String},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const projetosModel = mongoose.model('projetos', projetosSchema);

module.exports = projetosModel;
