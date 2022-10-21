const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  message: { type: String },
  userName: { type: String },
  avatar: { type: String },
  userId: { type: String },
  date: { type: Date },
});

module.exports = mongoose.model('Message', msgSchema);
