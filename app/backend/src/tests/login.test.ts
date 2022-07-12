import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import AuthService from '../services/auth.service';
import errors from '../services/errors';

const { invalidToken } = errors;

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  let response: Response;

  describe('when login is successful', () => {
    it('/ - return token', async () => {
      const stubToken = sinon.stub(AuthService, 'generateToken').returns('fake_token');

      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secret_user',
        })

      expect(response).to.have.status(200);
      expect(response.body).have.property('token');

      stubToken.restore();
    });


    it('/validate - with invalid token, return error', async () => {
      const stubDecoded = sinon.stub(AuthService, 'getDataToken')
        .returns({ 
          error: invalidToken,
          payload: null,
        });              
        
      response = await chai.request(app)
        .get('/login/validate')
        .auth('token', { type: 'bearer' })

      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message')      

      stubDecoded.restore();            
    });
  })

  describe('when login is incorrect', () => {
    it('/ - without informed email', async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          password: 'secret_user',
        })

      expect(response).to.have.status(400);
      expect(response.body).have.property('message').equal("All fields must be filled");
    })

    it('/ - without informed password', async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
        })

      expect(response).to.have.status(400);
      expect(response.body).have.property('message').equal("All fields must be filled");
    })

    it('/ - incorrect password', async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secret_useraaaaaaaaaa',
        })

      expect(response).to.have.status(401);
      expect(response.body).have.property('message').equal("Incorrect email or password");
    })

    it('/ - incorrect email', async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@useraaaaaaaa',
          password: 'secret_user',
        })

      expect(response).to.have.status(401);
      expect(response.body).have.property('message').equal("Incorrect email or password");
    })
  })

});
