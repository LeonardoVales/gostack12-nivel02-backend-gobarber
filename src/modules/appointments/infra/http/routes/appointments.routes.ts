import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//     const appointments = await appointmentsRepository.find();
//     return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;


// Separa o que é regra de negócio do que é transformação de dados
// Tudo que é transformação de dados, isto é: recebo a informação de uma forma e
// quero transformar ela em outra, isso fica na rota.
// O que é regra de negócio fica dentro do Service
