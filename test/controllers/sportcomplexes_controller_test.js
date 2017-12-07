const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const SportComplex = mongoose.model('sportcomplex');

describe('Sportcomplexes controller', () => {
    beforeEach(done => {
        const { sportcomplexes } = mongoose.connection.collections;
        sportcomplexes.drop()
            .then(() => done())
            .catch(() => done());
    });

    it('GET to /api/sportcomplexes reads all the sportcomplexes', done => {
        SportComplex.count().then(count => {
            request(app)
                .get('/api/sportcomplexes')
                .end(() => {
                    SportComplex.count().then(newCount => {
                        assert(count === newCount);
                        done();
                    });
                });
        });
    });

    it('GET to /api/sportcomplexes/:id reads the selected sportcomplex', done => {
        const sportcomplex = new SportComplex({
            name: 'GetOneTestNaam',
            address: 'GetOneStraat',
            houseNumber: 123,
            postalCode: '4726AX',
            email: 'GetOne@info.com',
            phoneNumber: "0612342123"
        });
        sportcomplex.save().then(() => {
            request(app)
                .get('/api/sportcomplexes/' + sportcomplex._id)
                .end(() => {
                    SportComplex.findOne({name: 'GetOneTestNaam'})
                        .then(sportcomplex => {
                            assert(sportcomplex.address === 'GetOneStraat');
                            done();
                        });
                });
        });
    });


        it('POST to /api/sportcomplexes creates a new sportcomplex', done => {
            SportComplex.count().then(count => {
                request(app)
                    .post('/api/sportcomplexes')
                    .send({
                        name: 'Harella',
                        address: 'Herelsestraat',
                        houseNumber: 123,
                        postalCode: '4726AX',
                        email: 'Harella@info.com',
                        phoneNumber: "0612342123"
                    })
                    .end(() => {
                        SportComplex.count().then(newCount => {
                            assert(count + 1 === newCount);
                            done();
                        });
                    });
            });
        });

        it('PUT to /api/sportcomplexes/id edits an existing sportcomplex', done => {
            const sportcomplex = new SportComplex({
                name: 'PutTestNaam',
                address: 'PutTestStraat',
                houseNumber: 123,
                postalCode: '4726AX',
                email: 'PutTest@info.com',
                phoneNumber: "0612342123"
            });
            sportcomplex.save().then(() => {
                request(app)
                    .put('/api/sportcomplexes/' + sportcomplex._id)
                    .send({email: 'justinkannekens@hotmail.nl'})
                    .end(() => {
                        SportComplex.findOne({name: 'PutTestNaam'})
                            .then(sportcomplex => {
                                assert(sportcomplex.email === 'justinkannekens@hotmail.nl');
                                done();
                            });
                    });
            });
        });

        it('DELETE to /api/sportcomplex/id can delete a sportcomplex', done => {
            const sportcomplex = new SportComplex({
                name: 'DeleteTestNaam',
                address: 'DeleteTestStraat',
                houseNumber: 123,
                postalCode: '4726AX',
                email: 'DeleteTest@info.com',
                phoneNumber: "0612342123"
            });

            sportcomplex.save().then(() => {
                request(app)
                    .delete('/api/sportcomplexes/' + sportcomplex._id)
                    .end(() => {
                        SportComplex.findOne({name: 'DeleteTestNaam'})
                            .then((sportcomplex) => {
                                assert(sportcomplex === null);
                                done();
                            });
                    });
            });
        });
    });



