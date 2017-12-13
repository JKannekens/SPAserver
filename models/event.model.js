const mongoose = require('mongoose');
const ParticipantSchema = require('./participant.model');
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    organizerName: {
      type: String,
      required: true
    },
    eventName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: false
    },
    sportcomplexName: {
        type: String,
        required: true
    },
    sportcomplexHall: {
        type: String,
        required: true
    },
    participants: [ParticipantSchema]
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;