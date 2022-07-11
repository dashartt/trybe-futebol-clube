import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/Team';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET /team', () => {
  let response: Response;

    it('/ - list all teams in array', async () => {
      response = await chai.request(app)
        .get('/teams')        

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');   

    });

    it('/:id - list a team in object', async () => {
      response = await chai.request(app)
        .get('/teams/1')        

      expect(response.body).to.have.all.keys('id', 'teamName')
    });
  });