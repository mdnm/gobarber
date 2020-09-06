import { Router } from 'express';

import ensureAuthenticated from '@modules/users/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', appointmentController.find);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
