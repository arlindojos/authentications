import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import router from './router';
import verifyToken from './auth/isAuth';
import sessionConfig from './config/sessions';

dotenvExpand(config());

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(sessionConfig);

app.use(verifyToken);
app.use(router);

app.listen(process.env.HTTP_PORT || 3003);