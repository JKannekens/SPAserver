const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');

const Event = mongoose.model('event');

describe('Events controller', () => {
    before(done => {
        mongoose.connect('mongodb://localhost/Zaalvoetbal_test', { useMongoClient: true });
        mongoose.connection
            .once('open', () => done())
            .on('error', err => {
                console.warn('Warning', error);
            });
    });

    beforeEach(done => {
        const { events } = mongoose.connection.collections;
        events.drop()
            .then(() => done())
            .catch(() => done());
    });

    it('GET to /api/events reads all the events', done => {
        Event.count().then(count => {
            request(app)
                .get('/api/events')
                .end(() => {
                    Event.count().then(newCount => {
                        assert(count === newCount);
                        done();
                    });
                });
        });
    });

    it('GET to /api/events/id reads the selected event', done => {
        const event = new Event({
            organizerName: 'GetOneTestNaam',
            eventName: 'eventnaamtest',
            date: '2017-08-15',
            sportcomplexName: 'Harella',
            sportcomplexHall: '1A',
        });
        event.save().then(() => {
            request(app)
                .get('/api/events/' + event._id)
                .end(() => {
                    Event.findOne({organizerName: 'GetOneTestNaam'})
                        .then(event => {
                            assert(event.eventName === 'eventnaamtest');
                            done();
                        });
                });
        });
    });


    it('POST to /api/events creates a new event', done => {
        Event.count().then(count => {
            request(app)
                .post('/api/events')
                .send({
                    organizerName: 'PostTestNaam',
                    eventName: 'eventnaamtest',
                    date: '2017-08-15',
                    sportcomplexName: 'Harella',
                    sportcomplexHall: '1A'
                })
                .end(() => {
                    Event.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('PUT to /api/events/id edits an existing event', done => {
        const event = new Event({
            organizerName: 'PutTestNaam',
            eventName: 'eventnaamtest',
            date: '2017-08-15',
            sportcomplexName: 'Harella',
            sportcomplexHall: '1A'
        });
        event.save().then(() => {
            request(app)
                .put('/api/events/' + event._id)
                .send({eventName: 'eventnaamtest2'})
                .end(() => {
                    Event.findOne({organizerName: 'PutTestNaam'})
                        .then(event => {
                            assert(event.eventName === 'eventnaamtest2');
                            done();
                        });
                });
        });
    });

    it('DELETE to /api/events/id can delete a event', done => {
        const event = new Event({
            organizerName: 'DeleteTestNaam',
            eventName: 'eventnaamtest',
            date: '2017-08-15',
            sportcomplexName: 'Harella',
            sportcomplexHall: '1A'
        });

        event.save().then(() => {
            request(app)
                .delete('/api/events/' + event._id)
                .end(() => {
                    Event.findOne({organizerName: 'DeleteTestNaam'})
                        .then((event) => {
                            assert(event === null);
                            done();
                        });
                });
        });
    });
});