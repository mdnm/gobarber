import { Router } from 'express';

import usersRouter from '@modules/users/http/routes/users.routes';
import sessionsRouter from '@modules/users/http/routes/sessions.routes';
import passwordRouter from '@modules/users/http/routes/password.routes';
import appointmentsRouter from '@modules/appointments/http/routes/appointments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
