let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();

chai.use(chaiHttp);

describe('searchUser', () => {

  describe('/POST searchUser', () => {
      it('leidma vastava kasutaja', (done) => {
        let searchQuery = {
          bothNames: "harli"
        }
        chai.request(server)
            .post('/api/search/user')
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

  describe('/POST searchRecentchats', () => {
      it('leidma vastava kasutaja kõik chatid, millest edasi filtreerida välja viimatised', (done) => {
        let searchQuery = {
          userID: "61a95715afe9e40858a128d3"
        }
        chai.request(server)
            .post('/api/search/recentchats')
            .type('json')
            .set('Content-Type', 'application/json')
            .send(searchQuery)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('result1');
                res.body.should.have.property('result2');
                res.body.result1.should.be.a('array');
                res.body.result1.should.not.be.empty;
                res.body.result2.should.be.a('array');
                res.body.result2.should.not.be.empty;
              done();
            });
      });
  });

  describe('/POST searchUsersByIDs', () => {
      it('leidma id-de massiivi järgi kasutajate täisnimed ja tagastama ka need massiivina', (done) => {
        let searchQuery = {
          IDs: ["61a95715afe9e40858a128d3", "61a95741afe9e40858a128d7"]
        }
        chai.request(server)
            .post('/api/search/usersbyids')
            .type('json')
            .set('Content-Type', 'application/json')
            .send(searchQuery)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('returnData');
                res.body.returnData.should.be.a('array');
                res.body.returnData.should.not.be.empty;
              done();
            });
      });
  });

});