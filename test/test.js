const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app.js'); 
describe('REST Service Tests', () => {
    it('Retorna una lista de archivos', (done) => {
      chai
        .request(app)
        .get('/files/data') 
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
  
          // evaluando si vienen "file" y "lines"
          res.body.forEach((item) => {
            expect(item).to.have.property('file');
            expect(item).to.have.property('lines').that.is.an('array');
  
            // valida si line tiene las propiedades correspondientes
            item.lines.forEach((line) => {
              expect(line).to.have.property('text');
              expect(line).to.have.property('number');
              expect(line).to.have.property('hex');
            });
          });
  
          done();
        });
    });
  });