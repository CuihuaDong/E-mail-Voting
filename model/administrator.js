const db = require('../libs/db/mongo');
const mongoose  = require('mongoose');
const { Schema } = mongoose;
const administratorSchema = new Schema({
    name:String,
    password:String
},{   
     timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
});
const administratorModel = db.model('administrator',administratorSchema);
module.exports = administratorModel;