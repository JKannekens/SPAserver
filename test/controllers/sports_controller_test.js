// const assert = require('assert');
// const request = require('supertest');
// const app = require('../../app');
// const neo4j = require('neo4j-driver').v1;
//
// const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "123456"));
// const session = driver.session();
//
// describe('Sport controller', () => {
//     // before(done => {
//     //     c
//     //     done();
//     // });
//
//     // beforeEach(done => {
//     //     const { Sports } = session.connection.collections;
//     //     Sports.drop()
//     //         .then(() => done())
//     //         .catch(() => done());
//     // });
//
//     it('POST to /api/sports creates a new sport', done => {
//         records.count().then(count => {
//             request(app)
//                 .post('/api/sports')
//                 .send({
//                     name: 'SportTest'
//                 })
//                 .end(() => {
//                     session.count().then(newCount => {
//                         assert(count + 1 === newCount);
//                         done();
//                     });
//                 });
//         });
//     });
// });