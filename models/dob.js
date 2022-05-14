var mongoose = require('mongoose');

var DobSchema = new mongoose.Schema({
    dob: {
        type: String
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Dob', DobSchema);