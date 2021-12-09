let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();

chai.use(chaiHttp);

describe('auth', () => {

  describe('/POST login', () => {
      it('logima edukalt sisse ja andma tagasi sellekohase teate', (done) => {
        let loginData = {
          email: "harli@tlu.ee",
          password: "a12345678B!"
        }
        chai.request(server)
            .post('/api/auth/login')
            .type('json')
            .set('Content-Type', 'application/json')
            .send(loginData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
              done();
            });
      });
  });

  describe('/POST signup', () => {
    it('edukalt registreerumine ja sellekohase teate tagasi andmine', (done) => {
      let registerData = {
        "firstName": "Margo",
        "lastName": "Narõskin",
        "email": "margoo@tlu.ee",
        "password": "a12345678B!"
      }
      chai.request(server)
          .post('/api/auth/signup')
          .type('json')
          .set('Content-Type', 'application/json')
          .send(registerData)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
            done();
          });
    });
  });

  describe('/POST verify', () => {
    it('andma tagasi andmed kasutaja kohta, kelle valid tokeniga on tegu', (done) => {
      let tokenData = {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWE4ZTE3MTZlZGNhNDJlMGRiYzEyMCIsImZpcnN0TmFtZSI6ImFzZCIsImxhc3ROYW1lIjoiYXNkIiwiZW1haWwiOiJhc2RAYXNkLmFzZCIsImlhdCI6MTYzNzYwMTE3N30.OZgvgfOm3Nt5P0sUG-GZkwMUQ0HeUJ1EJGGJ5We7OXA"
      }
      chai.request(server)
          .post('/api/auth/verify')
          .type('json')
          .set('Content-Type', 'application/json')
          .send(tokenData)
          .end((err, res) => {
              res.should.have.status(202);
              res.body.should.be.a('object');
              res.body.should.have.property('isValid');
            done();
          });
    });
  });

});