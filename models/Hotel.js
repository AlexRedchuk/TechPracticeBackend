const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: { type: String },
    photo: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    city: { type: String, trim: true },
    stars: { type: Number, min: 1, max: 5},
    wifi: {type: Boolean },
    pool: { type: String, enum: ["Дорослий басейн", "Дитячий басейн", ""] },
    food: { type: String, enum: ["Все включено", "Сніданок і вечеря", "Сніданок"]},
    beach: { type: String, enum: ["Міський, піщаний", "Власний, піщаний", 
    "Міський, гальковий", "Власний, гальковий", "", "Міський, гравієвий", "Власний, гравієвий"]},
    room_mark: { type: Number, min: 0, max: 10},
    service_mark: { type: Number, min: 0, max: 10},
    cleanless_mark: { type: Number, min: 0, max: 10},
    food_mark: { type: Number, min: 0, max: 10},
    infrastructure_mark: { type: Number, min: 0, max: 10},
    recommendation: { type: Boolean },
    best_price: { type: Boolean }
});

module.exports = model('Hotel', schema);