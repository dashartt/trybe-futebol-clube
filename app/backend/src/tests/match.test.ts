import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/Match';
import { matchArray, matchInProgressFalse, matchInProgressTrue } from './mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches - return matches in array', () => {
  let response: Response;
  let stubMatch: sinon.SinonStub = sinon.stub(Match, 'findAll');

  afterEach(() => {
    stubMatch.reset();
  })

  describe('without filter [inProgress]', () => {
    
    it('/ - return matches array with inProgress false & true', async () => {
      stubMatch.resolves(matchArray as unknown as Match[]);
      
      response = await chai.request(app)
        .get('/matches')

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal(matchArray)      

      stubMatch.reset();
    });
  })

  describe('with filter [inProgress]', () => {

    it('/inProgress=true - return matches array with inProgress true', async () => {
      stubMatch.resolves(matchInProgressTrue as any as Match[]);

      response = await chai.request(app)
        .get('/matches?inProgress=true')

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal(matchInProgressTrue)    
    });

    it('/inProgress=false - return matches array with inProgress false', async () => {
      stubMatch.resolves(matchInProgressFalse as any as Match[]);

      response = await chai.request(app)
        .get('/matches?inProgress=false')

      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal(matchInProgressFalse)
    });
  })
});