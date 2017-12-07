const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/Zaalvoetbal_test', { useMongoClient: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', error);
        });
});
