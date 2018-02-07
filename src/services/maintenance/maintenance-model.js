'use strict';

// maintenance-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintenanceSchema = new Schema({
  text: { type: String, required: true },
  tipo: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const maintenanceModel = mongoose.model('maintenance', maintenanceSchema);

module.exports = maintenanceModel;
