const {
  Schema,
  model
} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    trim: true
  },
  nickName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  following: [{
    type: Schema.Types.ObjectId
  }],
  followers: [{
    type: Schema.Types.ObjectId
  }],
  isAdmin: {
    type:Boolean,
    default:false
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('User', userSchema);