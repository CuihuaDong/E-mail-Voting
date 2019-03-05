const mongoose  = require('mongoose');
const { Schema } = mongoose;
const administratorSchema = new Schema({
    name: String,
    totalNumOfVotes: Number,
    voters: Array,
    activity:{
        type: Schema.Types.ObjectId,
        ref: 'activity',
    }

},{   
     timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
});
const administratorModel = db.model('administrator',administratorSchema);
module.exports = administratorModel;