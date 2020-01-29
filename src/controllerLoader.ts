import express from 'express'
import 'reflect-metadata'
import { authController } from './modules/core/controllers/auth.controller'
import { homeController } from './modules/core/controllers/home.controller'

const controllerLoader = (app: express.Application) => {
  app.use(authController),
  app.use(homeController)
}

export = controllerLoader
