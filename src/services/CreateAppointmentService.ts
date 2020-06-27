import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { endOfDecadeWithOptions } from 'date-fns/fp';


interface Request {
    provider: String;
    date: Date;
}

class CreateAppointmentService {

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        return appointment;

    }
}

export default CreateAppointmentService;


// O service tem que ter uma ÚNICA responsabilidade, nesse caso o método execute.
// Ele recebe os dados, vez a regra de negócio verificando se está tudo ok
// e em seguida cria o agendamento e devolve a informação criada para a rota
