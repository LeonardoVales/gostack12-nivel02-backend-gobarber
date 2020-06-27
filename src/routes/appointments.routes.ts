import e, { Router, response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { endOfDecadeWithOptions } from 'date-fns/fp';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {

    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointment.execute({ provider, date: parsedDate })

        return response.json(appointment);
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }

});

export default appointmentsRouter;


// Separa o que é regra de negócio do que é transformação de dados
// Tudo que é transformação de dados, isto é: recebo a informação de uma forma e
// quero transformar ela em outra, isso fica na rota.
// O que é regra de negócio fica dentro do Service
