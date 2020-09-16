import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;


// Separa o que é regra de negócio do que é transformação de dados
// Tudo que é transformação de dados, isto é: recebo a informação de uma forma e
// quero transformar ela em outra, isso fica na rota.
// O que é regra de negócio fica dentro do Service
