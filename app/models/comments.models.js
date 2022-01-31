const {
  Schema,
  model
} = require('mongoose');

const comentsSchema = new Schema({
  _idUser: {
    type: Schema.Types.ObjectId
  },
  _idTwit: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  comments: {
    type: String,
    required: true,
    trim: true,
    ref: 'Comments'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('Comments', comentsSchema);