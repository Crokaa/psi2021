var express = require('express');
var router = express.Router();

// Require controller modules.
var utilizador_controller = require('../controllers/utilizador_controller');

router.get('/:nickname', utilizador_controller.utilizador_info);

router.post('/', utilizador_controller.utilizador_novo_utilizador);

module.exports = router;
