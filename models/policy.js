var mongoose = require('mongoose');

var policySchema = new mongoose.Schema({
    policy_number: {
        type: String
    },
    policy_mode: {
        type: String
    },
    policy_type: {
        type: String
    },
    policy_start_date: {
        type: String
    },
    policy_end_date: {
        type: String
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Policy', policySchema);