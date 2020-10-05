import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointmentController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date(),
    }
}), appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;


// Separa o que é regra de negócio do que é transformação de dados
// Tudo que é transformação de dados, isto é: recebo a informação de uma forma e
// quero transformar ela em outra, isso fica na rota.
// O que é regra de negócio fica dentro do Service
