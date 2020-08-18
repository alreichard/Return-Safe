const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GeolocationSchema = new Schema({
    recordedAt: {
        type: Date,
        default: Date.now
    },
    
    latitude: {
        type: mongoose.Schema.Types.Decimal128
    },

    longitude: {
        type: mongoose.Schema.Types.Decimal128
    },

    time: {
        type: Number
    },
    minutes: {
        type: Number
    }

});

const GeoLocation = mongoose.model("Geolocation", GeolocationSchema);

module.exports = GeoLocation;