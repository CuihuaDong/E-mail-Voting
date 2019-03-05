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
      passowrd: String,
      email: String
  })
  
  const user = db.model('user',userSchema);
  module.exports = user