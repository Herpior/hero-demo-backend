const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { index: true, type: String }
})

module.exports = mongoose.model("Hero", schema, "Heroes");