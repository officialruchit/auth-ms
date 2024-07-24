import { Router } from 'express';
import signup from '../controllers/signupController';
import signin from '../controllers/signinController'
import viewProfile from '../controllers/viewProfile'; 
import auth from '../middleware/auth'


const routes = Router();

routes.post('/signup', signup);
routes.post('/signin',auth, signin);
routes.get('/view',auth,viewProfile );
export default routes;
