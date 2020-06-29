import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { endOfDecadeWithOptions } from 'date-fns/fp';


interface Request {
    provider_id: String;
    date: Date;
}

class CreateAppointmentService {

    public async execute({ date, provider_id }: Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;

    }
}

export default CreateAppointmentService;


// O service tem que ter uma ÚNICA responsabilidade, nesse caso o método execute.
// Ele recebe os dados, vez a regra de negócio verificando se está tudo ok
// e em seguida cria o agendamento e devolve a informação criada para a rota
