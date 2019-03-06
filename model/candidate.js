const mongoose  = require('mongoose');
const { Schema } = mongoose;
const administratorSchema = new Schema({
    name: {
        type: String,
        unique:true,
        index:true
    },
    totalNumOfVotes: {
        type: Number,
        default:0
    },
    voters: Array,
    activity:{
        type: Schema.Types.ObjectId,
        ref: 'activity',
    }

},{   
     timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
     toObject: { getters: true },
     toJSON: { getters: true },
});
const administratorModel = db.model('administrator',administratorSchema);
module.exports = administratorModel;