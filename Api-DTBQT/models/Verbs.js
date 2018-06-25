const mongoose = require('mongoose');
//const Verbs = require('../index.json');
const verbSchema = mongoose.Schema({
    name: String,
    past: String,
    participles: [String],
    frequency: String,
})

var Verb = mongoose.model('Verb', verbSchema);
module.exports = Verb;