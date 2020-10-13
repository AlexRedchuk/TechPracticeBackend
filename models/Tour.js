const {Schema, model} = require('mongoose');

const schema = new Schema({
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    photo: { type: String },
    hotel: { unique: true, type: Schema.Types.ObjectId, ref: 'Hotel'},
    price: { type: Number },
    departure: { type: String },
    date: { type: Date, default: Date.now, min: Date.now },
    duration: { type: Number, min: 2, max: 7},
    adults: { type: Number, min: 1, max: 4},
    children: { type: Number, min: 0, max: 4},
    room: { type: String, enum: ['Стандарт', 'Економний', 'Люкс']},
    discount: { type: Number, min: 0, max: 40, default: 0 },
    medInsurance: { type: String, enum: ['Базова', 'Немає']},
    tourOperator: { type: String }
});

module.exports = model('Tour', schema);
