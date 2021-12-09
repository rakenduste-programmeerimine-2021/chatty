let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();

chai.use(chaiHttp);

describe('search', () => {

  describe('/POST search', () => {
      it('leidma vastava kasutaja', (done) => {
        let searchQuery = {
          bothNames: "harli"
        }
        chai.request(server)
            .post('/api/search')
            .type('json')
            .set('Content-Type', 'application/json')
            .send(searchQuery)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('result');
                res.body.result.should.be.a('array');
                res.body.result.should.not.be.empty;
              done();
            });
      });
  });

});