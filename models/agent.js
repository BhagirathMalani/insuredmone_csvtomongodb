var mongoose = require('mongoose');

var AgentSchema = new mongoose.Schema({
    agent: {
        type: String
    },
    agency_id: {
        type: String
    },


}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Agent', AgentSchema);