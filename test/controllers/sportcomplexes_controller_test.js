const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const SportComplex = mongoose.model('sportcomplex');

describe('Sportcomplexes controller', () =>{
   it('Post to /api/sportcomplexes creates a new sportcomplex', done => {
      SportComplex.count().then(count => {
          request(app)
              .post('/api/sportcomplexes')
              .send(
                  {
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
});