const mongoose  = require("mongoose");
const db = require("../libs/db/mongo")
const {
    Schema
  } = mongoose;

  const userSchema = new Schema({
      name:{
          type: String,
          index: true,
          unique: true
      },
      passWord: String,
      email: String,
      date: String,
      isValid: {
          type: Boolean,
          default: false
      }
  })
  
  const user = db.model('user',userSchema);
  module.exports = user