import express from 'express';
import db from './config/db';
import authRoutes from './routes/authRoutes';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3333;
db();
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
