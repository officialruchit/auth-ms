import { Router } from 'express';
import signup from '../controllers/signupController';
import signin from '../controllers/signinController'
import viewProfile from '../controllers/viewProfile'; 
import updateProfile from '../controllers/updateProfile'
import auth from '../middleware/auth'
import verifyEmailOrNumber from '../controllers/verifyEmailOrNumber';
import forgotpassword from '../controllers/forgotPassword'
import resetPassword from '../controllers/resetPassword';
const routes = Router();

routes.post('/signup', signup);
routes.post('/signin',auth, signin);
routes.get('/view',auth,viewProfile );
routes.put('/updateProfile',auth,updateProfile)
routes.post('/verifyEmailOrNumber',auth,verifyEmailOrNumber)
routes.post('/forgotpassword',auth,forgotpassword)
routes.post('/resetpassword',resetPassword)

export default routes;
