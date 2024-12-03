import express from 'express';
import cors from 'cors'; 
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/billingapp', userRoutes);

app.use(errorHandler);

export default app;
