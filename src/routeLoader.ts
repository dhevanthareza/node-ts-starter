import express from 'express';
import 'reflect-metadata';
import AuthController from './modules/core/controller/auth.controller';
import isAuthenticated from './modules/core/middlewares/auth.middleware';
import ManagementRouter from './modules/management/management.router';
import { RootRouter } from './router/router';

const RouteLoader = (app: express.Application) => {
  app.use('/auth', AuthController);
  app.use('/management', isAuthenticated, ManagementRouter);
  app.use(RootRouter)
};

export = RouteLoader;
