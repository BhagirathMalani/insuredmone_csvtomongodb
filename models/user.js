var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    gender: {
        type: String
    },
    firstname: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', UserSchema);