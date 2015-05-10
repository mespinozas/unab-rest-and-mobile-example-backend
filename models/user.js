'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  nombre: {type: String, required:true},
  apePat: {type: String, required:true},
  apeMat: {type: String, required:true},
  telefono: {type: String, required:true},
});

module.exports = mongoose.model('User', userSchema );
