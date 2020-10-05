import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    },
}), providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    },
}), providerDayAvailabilityController.index);


export default providersRouter;


// Separa o que é regra de negócio do que é transformação de dados
// Tudo que é transformação de dados, isto é: recebo a informação de uma forma e
// quero transformar ela em outra, isso fica na rota.
// O que é regra de negócio fica dentro do Service
