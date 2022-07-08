import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;
const should = chai.should();

describe('/login', () => {
  let response: Response;

  it('login success and return token', async () => {
    response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
        })

    expect(response).to.have.status(200);
    expect(response.body).have.property('token');
  });

  it('doesn"t allow access without informed email', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      })
    
      expect(response).to.have.status(400);
      expect(response.body).have.property('message').equal("All fields must be filled");
  })

  it('doesn"t allow access without informed password', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',        
      })
    
      expect(response).to.have.status(400);
      expect(response.body).have.property('message').equal("All fields must be filled");
  })  
});
