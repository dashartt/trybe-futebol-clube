import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const matchRoutes = Router();

matchRoutes.get(
    '/',
    TeamController.getAll,
);

matchRoutes.get(
    '/:id',
    TeamController.getOne,
);

export default matchRoutes;
