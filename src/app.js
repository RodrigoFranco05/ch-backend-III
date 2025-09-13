import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { config } from '../config/config.js';

const app = express();
const PORT = config.PORT;
mongoose.set('strictQuery', false);
const connection = mongoose.connect(config.MONGO_URI)

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Adopción de Mascotas',
      version: '1.0.0',
      description: 'API para gestión de usuarios, mascotas y adopciones',
    },
    servers: [
      {
        url: `http://localhost:${PORT || 3000}`
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

export default app;
