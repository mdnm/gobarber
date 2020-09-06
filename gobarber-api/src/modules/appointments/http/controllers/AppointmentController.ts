import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentController {
  public async find(_: Request, response: Response): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = await container.resolve(CreateAppointmentService).execute({
      provider_id, date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default AppointmentController;
