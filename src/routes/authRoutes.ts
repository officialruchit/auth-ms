import { Router } from 'express';
import signup from '../controllers/signupController';
import signin from '../controllers/signinController';
import viewProfile from '../controllers/viewProfile';
import updateProfile from '../controllers/updateProfile';
import auth from '../middleware/auth';
import { verifyEmailOrNumber, otpForEmailOrNumber } from '../controllers/verifyEmailOrNumber';
import forgotpassword from '../controllers/forgotPassword';
import resetPassword from '../controllers/resetPassword';
import { updateEmail, verifyEmail } from '../controllers/updateEmail';
import verifyOtp from '../controllers/verifyotp';
import updatePhoneNumber from '../controllers/updateNumber';
import verifyotpForNumber from '../controllers/verifyOtpforNumber'
import enableTwoFA from '../controllers/2FAEnable'
import verifyTwoFA from '../controllers/verifyTwoFA'
const routes = Router();

routes.post('/signup', signup);
routes.post('/signin', signin);

routes.get('/view', auth, viewProfile);
routes.put('/updateProfile', auth, updateProfile);

routes.post('/verifyEmailOrNumber', auth, verifyEmailOrNumber);
routes.put('/verifyEmailOrNumber', auth, otpForEmailOrNumber);

routes.post('/forgotpassword', forgotpassword);
routes.post('/resetpassword', resetPassword);
routes.post('/verify', verifyOtp);

routes.post('/updateEmail', auth, updateEmail);
routes.put('/updateEmail', auth, verifyEmail)

routes.post('/updatePhoneNumber', auth, updatePhoneNumber);
routes.put('/updatePhoneNumber', auth, verifyotpForNumber)
routes.post('/enableTwoFA', auth, enableTwoFA)
routes.post('/verifyTwoFA', verifyTwoFA)


export default routes;
