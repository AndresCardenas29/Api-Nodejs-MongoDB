const {
  Schema,
  model
} = require('mongoose');

const followingSchema = new Schema({
  _idUser: {
    type: String,
    required: true,
    unique:true
  }
},{
  versionKey: false,
});


module.exports = model('Following', followingSchema);