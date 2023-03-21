var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FotografiaSchema = new Schema(
  {
    nome: {type: String, required: true, maxlength: 100},
    descricao: {type: String, maxlength: 500},
    data: {type: Date},
    listaLikes:  [{ type: String, unique: true }],
    idUpload: {type: String},
    image: {type: String},
  }
);

    /* listaLikes: {type: [String]}, */


//Export model
module.exports = mongoose.model('Fotografia', FotografiaSchema);
