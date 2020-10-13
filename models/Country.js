const {Schema, model} = require('mongoose');

const schema = new Schema({
    img: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true},
    tours_photo: { type: String, required: true, unique: true }
});

module.exports = model('Country', schema);
