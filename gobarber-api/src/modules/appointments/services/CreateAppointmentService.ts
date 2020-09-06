import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import HttpStatusCode from '@shared/enums/HttpStatusCode';
import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentOfSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentOfSameDate) {
      throw new AppError('This hour is already booked', HttpStatusCode.BAD_REQUEST);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id, date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
