import chalk from 'chalk'
import dotenv, { config } from 'dotenv'
import express from 'express'
import moment from 'moment'
import path, { resolve } from 'path'
import 'reflect-metadata'
import controllerLoader from './controllerLoader'
import middlewareLoader from './middlewareLoader'
import modelLoader from './modelLoader'
import { sequelize } from './modules/core/config/database'

config({ path: resolve(__dirname, '../../.env.example') })

dotenv.config()
moment.locale('id')

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.settings()
    middlewareLoader(this.app)
    controllerLoader(this.app)
  }

  public async listen() {
    modelLoader(sequelize)
    this.app.listen(this.app.get('port'), () => {
      console.log(`${chalk.green('✓')} server started at http://localhost:${this.app.get('port')}`)
    })
  }

  private settings() {
    this.app.set('host', '0.0.0.0')
    this.app.set('port', process.env.PORT || 8080)
    this.app.set('views', path.join(__dirname, '../views'))
    this.app.set('view engine', 'pug')
    this.app.use('/assets', express.static('views/assets'))
  }
}
const server = new App()
server.listen()
