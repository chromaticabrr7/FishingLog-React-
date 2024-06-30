const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    date: Date,
    latitude: String,
    longitude: String,
    name: String,
    species: [ String ]
}, { collection: 'logs' });

module.exports = mongoose.model('Log', logSchema);

