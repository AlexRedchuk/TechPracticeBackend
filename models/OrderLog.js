const {Schema, model} = require('mongoose');

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    tour: { type: Schema.Types.ObjectId, ref: 'Tour'}
});

module.exports = model('OrderLog', schema);
