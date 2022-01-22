const {
  Schema,
  model
} = require('mongoose');

const twitSchema = new Schema({
  _idUser: {
    type: Schema.Types.ObjectId
  },
  twitText: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  gift: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  ubication: {
    type: String,
    required: false,
    trim: true,
    default: ''
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('Twit', twitSchema);