import { startOfHour } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import AppError from '@shared/erros/AppError';


interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {

    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        return appointment;

    }
}

export default CreateAppointmentService;


// O service tem que ter uma ÚNICA responsabilidade, nesse caso o método execute.
// Ele recebe os dados, vez a regra de negócio verificando se está tudo ok
// e em seguida cria o agendamento e devolve a informação criada para a rota
