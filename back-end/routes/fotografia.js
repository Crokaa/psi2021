var express = require('express');
var router = express.Router();

// Require controller modules.
var fotografia_controller = require('../controllers/fotografia_controller');

router.get('/show/:id', fotografia_controller.fotografia_get_foto);

router.get('/like/:id', fotografia_controller.fotografia_get_like_status);

router.put('/like/:id/add', fotografia_controller.fotografia_like);

router.put('/like/:id/remove', fotografia_controller.fotografia_remove_like);

router.get('/fav/:id', fotografia_controller.fotografia_get_favorite_status);

router.put('/fav/:id/add', fotografia_controller.fotografia_favorite);

router.put('/fav/:id/remove', fotografia_controller.fotografia_remove_favorite);

router.get('/popular', fotografia_controller.fotografia_get_populares);

router.get('/recent', fotografia_controller.fotografia_get_recentes);

router.get('/user/:id', fotografia_controller.fotografia_get_user_fotos);

router.get('/user/fav/:id', fotografia_controller.fotografia_get_user_fav);

router.post('/', fotografia_controller.fotografia_post);

router.delete('/:id', fotografia_controller.fotografia_delete);

module.exports = router;
