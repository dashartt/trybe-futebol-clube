import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/Team';


chai.use(chaiHttp);

const { expect } = chai;

describe('/team', () => {
  let response: Response;

    it('GET / list all teams', async () => {
      response = await chai.request(app)
        .get('/teams')        

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');   

    });

    it('GET /:id list a team', async () => {
      response = await chai.request(app)
        .get('/teams/1')        

      expect(response.body).to.have.all.keys('id', 'teamName')
    });
  });