const Event = require('../models/event.model');

module.exports = {
    readAll(req, res, next) {
        Event.find({})
            .then( (Event) => {
                res.send(Event);
            })
            .catch( (err) => next(err));

    },

    readOne(req, res, next) {
        const eventId = req.params.id;

        Event.findOne({ _id: eventId })
            .then( (Event) => {
                res.send(Event);
            })
            .catch( (err) => next(err));
    },

    create(req, res, next) {
        const eventProps = req.body;

        Event.create(eventProps)
            .then(event => res.send(event))
            .catch(next);
    },

    edit(req, res, next) {
        const eventId = req.params.id;
        const eventProps = req.body;

        Event.findByIdAndUpdate({ _id: eventId }, eventProps, {new: true})
            .then( (Event) => {
                res.send(Event);
            })
            .catch( (err) => next(err));
    },

    delete(req, res, next) {
        const eventId = req.params.id;

        Event.findByIdAndRemove({ _id: eventId })
            .then(event => res.status(204).send(event))
            .catch(next);
    }
};