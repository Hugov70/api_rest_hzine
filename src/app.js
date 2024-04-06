import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config(); 
import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';

const whiteList = [
  'http:192.168.0.90:82',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://hzine.netlify.app',
  'https://hzine.netlify.app/login',
  'https://hzine.netlify.app/register',
  'https://hzine-5upuj2db6-hugov70s-projects-8db8cbbe.vercel.app/login',
  'https://hzine-5upuj2db6-hugov70s-projects-8db8cbbe.vercel.app'
]

const corsOptions = {
  origin: function (origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

class App {
    constructor() {
      this.app = express();
      this.middlewares();
      this.routes();
    }
  
    middlewares() {
      this.app.use(cors(corsOptions));
      this.app.use(helmet());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.json());
    }
  
    routes() {
      this.app.use('/', homeRoutes);
      this.app.use('/users', userRoutes);
      this.app.use('/tokens', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        if ('OPTIONS' == req.method) {
        res.sendStatus(200);
        } else {
          next();
        }
      } , tokenRoutes);
    }
  }
  
  export default new App().app;