var Utilizador = require('../models/utilizador');
var Fotografia = require('../models/fotografia');

var async = require('async');


exports.utilizador_info = function (req, res, next) {

  Utilizador.findOne({ nickname: req.params.nickname })
    .populate({ path: "fotografiasFavoritos" })
    .exec(function (err, utilizador) {
      res.send(utilizador);
    });

};


exports.utilizador_novo_utilizador = function (req, res, next) {

  var novoU = new Utilizador({
    nickname: req.body.nickname,
    pass: req.body.pass,
    fotografias: [],
    fotografiasFavoritos: []
  });

  novoU.save(function (err) {
    if (err) {
      console.log(err);
    }
    res.send(novoU);

  });

};
