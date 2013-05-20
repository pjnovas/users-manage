
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = function(app) {

  var User = new Schema({
      "provider": { type: String, required: true }
    , "provider_id": { type: Number, required: true }
    , "username": { type: String, required: true }
    , "name": { type: String, required: true }
    , "email": { type: String, validate: /.+@.+\..+/ }
    , "picture": String
    , "created_at": {type: Date, default: Date.now }
  });

  mongoose.model('User', User);

};