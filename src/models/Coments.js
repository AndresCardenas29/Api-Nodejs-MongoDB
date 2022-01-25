const {
  Schema,
  model
} = require('mongoose');

const comentsSchema = new Schema({
  _idUser: {
    type: Schema.Types.ObjectId
  },
  coment: [{
    type: Schema.Types.ObjectId,
    required: true,
  }]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('Coments', comentsSchema);