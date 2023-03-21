var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UtilizadorSchema = new Schema(
  {
    nickname: {type: String, required: true, unique: true, maxlength: 100},
    pass: {type: String, required: true, maxlength: 100},
    fotografias: {type: [Schema.Types.ObjectId], ref:'Fotografia'},
    fotografiasFavoritos: {type: [Schema.Types.ObjectId], ref:'Fotografia'},
  }
);


//Export model
module.exports = mongoose.model('Utilizador', UtilizadorSchema);
