const mongoose = require('mongoose');
const config = require('../config/config');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: { type: String },
    avatar: { type: String },
    about: { type: String },
    facebookId: { type: String },
    passwordHash: {
      type: String,
    },
    salt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, config.crypto.iterations, config.crypto.length, config.crypto.digest, (err, key) => {
      if (err) return reject(err);
      resolve(key.toString('hex'));
    });
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.crypto.length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

userSchema.methods.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function (password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
