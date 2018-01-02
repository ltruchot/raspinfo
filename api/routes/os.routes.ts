import { readOs } from '../controllers/os.controller';
import { Application } from 'express';
export function setOsRoutes (app: Application): void  {
	app.route('/api/os').get(readOs);
}
