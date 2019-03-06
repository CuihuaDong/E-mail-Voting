const db = require('../libs/db/mongo');
const mongoose  = require('mongoose');
const { Schema } = mongoose;
const activitySchema = new Schema({
    name: String,
    startDate: Date,
    endDate: Date
},{
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
});
const activityModel = db.model('activity',activitySchema);
module.exports = activityModel