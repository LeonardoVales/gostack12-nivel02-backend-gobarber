import { uuid } from 'uuidv4';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import { getDay } from 'date-fns/esm';

class AppointmentsRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date),
        );

        return findAppointment;

    }

    public async findAllInMonthFromProvider({
        provider_id,
        year,
        month,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

        const appointments = this.appointments.filter( appointment => {
            return (
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        })

        return appointments;

    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        year,
        month,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

        const appointments = this.appointments.filter( appointment => {
            return (
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        })

        return appointments;

    }

    public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {

        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
        this.appointments.push(appointment);

        return appointment;
    }

}

export default AppointmentsRepository;
