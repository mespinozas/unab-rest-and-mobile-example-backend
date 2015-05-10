'use strict';

var clientsLib = require('../../../lib/clientsLib');

module.exports = function (router) {

  router.get('/', function (req, res) {

    clientsLib.getAll(function(error, results){

      res.setHeader('Access-Control-Allow-Origin','*');

      if (error){
        return res.status(500).json(error).end();
      }

      res.status(200).json(results).end();

    });

  });

  router.get('/:id', function (req, res) {

    var id = req.params.id;

    clientsLib.getById(id, function(error, client){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(200).json(client).end();

    });
  });

  router.post('/', function (req, res) {

    var newClient = req.body;

    clientsLib.create(newClient, function(error){

      if (error){
        return res.status(500).json(error).end();
      }

      res.status(201).end();

    });
  });

  router.put('/:id', function (req, res) {

    var id = req.params.id;
    var newData = req.body;

    clientsLib.update(id, newData, function(error, client){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(200).json(client).end();

    });
  });

  router.delete('/:id', function (req, res) {

    var id = req.params.id;

    clientsLib.delete(id, function(error, client){

      if (error){
        if (error.message === 'NOT_FOUND'){
          return res.status(404).end();
        }
        return res.status(500).json(error).end();
      }

      res.status(204).end();

    });
  });


};
