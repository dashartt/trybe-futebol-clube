import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';
import AuthService from '../services/auth.service';
import LoginService from '../services/login.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  let response: Response;

  describe('when login is successful', () => {
    it('/ - return token', async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        })

      expect(response).to.have.status(200);
      expect(response.body).have.property('token');
    });

    it('/validate - returns the user role', async () => {
      const stubDecoded = sinon.stub(AuthService, 'getDataToken').returns('joqlima@gmail.com');
      const stubRole = sinon.stub(LoginService, 'getRole').resolves({ role: 'admin'} as User);

      response = await chai.request(app)
        .get('/login/validate')
        .auth('token', { type: 'bearer' })

      expect(response).to.have.status(200);
      expect(response.body).have.property('role').equal('admin')                  


      stubDecoded.restore();
      stubRole.restore();
    });
  })

  describe('when login is incorrect', () => {
    it('/ - without informed email', async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
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
          password: '$2a$08$Y8Abi8jXvsXyqm.rmp',
        })

      expect(response).to.have.status(401);
      expect(response.body).have.property('message').equal("Incorrect email or password");
    })

    it('/ - incorrect email', async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user',
          password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        })

      expect(response).to.have.status(401);
      expect(response.body).have.property('message').equal("Incorrect email or password");
    })
  })

});
