let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();

chai.use(chaiHttp);

describe('chat', () => {

  describe('/POST sendChat', () => {
      it('salvestama edukalt chati ning saama sellekohase teate tagasi', (done) => {
        let sendChatData = {
          sender: "61a95741afe9e40858a128d7",
          receiver: "61a95715afe9e40858a128d3",
          message: "backend testi automaatne sõnum"
        }
        chai.request(server)
            .post('/api/chat/sendchat')
            .type('json')
            .set('Content-Type', 'application/json')
            .send(sendChatData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
              done();
            });
      });
  });

  describe('/POST receiveChats', () => {
    it('saama vastusena kõik omavahelised chatid kahe etteantud kasutaja IDde kohta', (done) => {
      let receiveChatData = {
        ID1: "61a95715afe9e40858a128d3",
        ID2: "61a95741afe9e40858a128d7"
      }
      chai.request(server)
          .post('/api/chat/receivechats')
          .type('json')
          .set('Content-Type', 'application/json')
          .send(receiveChatData)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('result1');
              res.body.should.have.property('result2');
            done();
          });
    });
  });

});