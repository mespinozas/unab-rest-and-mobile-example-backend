'use strict';

var ClientModel = require('../../models/client');
var logger = require('../logger');

var ClientsLib = function(){
  var self = this;

  self.getAll = function(callback){
    ClientModel.find().exec(function(error, data){
        callback(error, data);
    });
  };

  self.getById = function(id, callback){
    ClientModel.findOne({_id: id}).exec(function(error, data){
      if(!data){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, data);
    });
  };

  self.create = function(clientData, callback){
    var newClient = new ClientModel(clientData);

    newClient.save(function(error, client, numAffected){
        callback(error, client);
    });
  };

  self.update = function(id, newData, callback){
    delete newData._id;

    ClientModel.findOneAndUpdate({ _id: id }, newData, function(error, result){
      if(!result){
        return callback(new Error('NOT_FOUND'));
      }
      callback(error, result);
    });
  };

  self.delete = function(id, callback){
    ClientModel.remove({_id: id}, function(error){
      callback(error, id);
    });
  };
};

module.exports = new ClientsLib();
