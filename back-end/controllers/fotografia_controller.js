var Fotografia = require('../models/fotografia');
var Utilizador = require('../models/utilizador');


exports.fotografia_get_recentes = function (req, res, next) {

    Fotografia.find()
        .sort({ data: -1 })
        .limit(50)
        .exec(function (err, list_fotos) {

            if (err) {
                console.log(err);
            }
            res.send(list_fotos);
        });
};

exports.fotografia_get_populares = function (req, res, next) {

    /* Fotografia.find()
        //.sort({ listaLikes: { length } })
        .limit(50)
        .exec(function (err, list_fotos) {

            console.log("here");
            if (err) {
                console.log(err);
            }
            res.send(list_fotos);
        }); */

    Fotografia.aggregate([
        { $addFields: { like_count: {$size: { "$ifNull": [ "$listaLikes", [] ] } } }}, 
        { $sort: {"like_count": -1, data: -1} },
        { $limit: 50 }
    ], function(err, result) {
        res.send(result);
  });

};

exports.fotografia_get_foto = function (req, res, next) {

    Fotografia.findById(req.params.id)
        .exec(function (err, foto) {

            if (err) {
                console.log(err);
            }
            res.send(foto);
        });
};

exports.fotografia_get_like_status = function (req, res, next) {

    Fotografia.findById(req.params.id)
        .exec(function (err, foto) {
            if (err) {
                console.log(err);
            }

            res.send(foto.listaLikes.indexOf(req.query.user) !== -1);
        });

};


exports.fotografia_remove_like = function (req, res, next) {

    Fotografia.findByIdAndUpdate(req.params.id,
        {
            $pull: {
                listaLikes: req.query.user
            }
        },
        function (err, foto) {
            if (err) {
                console.log(err);
            }
        });
    res.send();
};

exports.fotografia_like = function (req, res, next) {

    Fotografia.findByIdAndUpdate(req.params.id,
        {
            $addToSet: {
                listaLikes: req.query.user
            }
        },
        function (err, foto) {
            if (err) {
                console.log(err);
            }
        });
    res.send();
};

exports.fotografia_favorite = function (req, res, next) {

    Utilizador.findOneAndUpdate({ nickname: req.query.user },
        {
            $addToSet: {
                fotografiasFavoritos: req.params.id
            }
        },
        function (err, user) {
            if (err) {
                console.log(err);
            }
        });
    res.send();
};

exports.fotografia_remove_favorite = function (req, res, next) {

    Utilizador.findOneAndUpdate({ nickname: req.query.user },
        {
            $pull: {
                fotografiasFavoritos: req.params.id
            }
        },
        function (err, user) {
            if (err) {
                console.log(err);
            }
        });
    res.send();
};

exports.fotografia_get_favorite_status = function (req, res, next) {

    Utilizador.findOne({ nickname: req.query.user })
        .exec(function (err, user) {
            if (err) {
                console.log(err);
            }

            res.send(user.fotografiasFavoritos.indexOf(req.params.id) !== -1);
        });

};

exports.fotografia_get_user_fotos = function (req, res, next) {

    Utilizador.findOne({ nickname: req.params.id })
        //.populate('fotografias', options: {sort: {data: -1}})
        .populate({ path: 'fotografias', options: { sort: { 'data': -1 } } })
        .exec(function (err, utilizador) {

            if (err) {
                console.log(err);
            }

            res.send(utilizador.fotografias);
        });
};

exports.fotografia_get_user_fav = function (req, res, next) {

    Utilizador.findOne({ nickname: req.params.id })
        .populate({ path: 'fotografiasFavoritos'})
        .exec(function (err, utilizador) {
  
            if (err) {
                console.log(err);
            }
  
            res.send(utilizador.fotografiasFavoritos);
        });
  };

exports.fotografia_post = function (req, res, next) {

    var novaFoto = new Fotografia({
        nome: req.body.nome,
        descricao: req.body.descricao,
        data: Date.now(),
        idUpload: req.body.idUpload,
        listaLikes: req.body.listaLikes,
        image: req.body.image,
    });

    novaFoto.save()
        .then(resultFoto => {
            Utilizador.findOneAndUpdate({ nickname: req.body.idUpload },
                {
                    $push: {
                        fotografias: resultFoto._id
                    }
                },
                function (err, user) {
                    if (err) {
                        console.log(err);
                    }
                })
        });

    res.send();
}

exports.fotografia_delete = function (req, res, next) {

    Fotografia.findByIdAndRemove(req.params.id, 
        function deleteFoto(err, foto) {
            
            Utilizador.updateMany({},
                {$pull: {fotografias: foto._id, fotografiasFavoritos: foto._id}}
            ).exec(function (err, utilizadores) {
                
                if (err) {
                    console.log(err);
                }
      
            });
           
        if (err)
        console.log(err);

        res.send();
    });
};