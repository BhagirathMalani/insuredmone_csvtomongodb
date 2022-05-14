var mongoose = require('mongoose');

var userAccountSchema = new mongoose.Schema({
    userType: {
        type: String
    },
    producer: {
        type: String
    },
    premium_amount_written: {
        type: String
    },
    premium_amount: {
        type: String
    },
    company_name: {
        type: String
    },
    category_name: {
        type: String
    },
    csr: {
        type: String
    },
    account_name: {
        type: String
    },
    account_type: {
        type: String
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('UserAccount', userAccountSchema);