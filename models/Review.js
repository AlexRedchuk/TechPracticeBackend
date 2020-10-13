const {Schema, model} = require('mongoose');

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    topic: { type: String, required: true},
    date: { type: Date, default: Date.now},
    text: { type: String},
    mark: { type: Number, min: 1, max: 10, default: 10}
});

module.exports = model('Review', schema);
