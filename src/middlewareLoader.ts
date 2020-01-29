import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import expressStatusMonitor from 'express-status-monitor'
import lusca from 'lusca'
import moment from 'moment'
import morgan from 'morgan'
import 'reflect-metadata'
import { logger } from './helpers/logger'
import { passport } from './modules/core/config/passport'
import { pathMiddleware } from './modules/core/middlewares/path.middleware'

const middlewareLoader = (app: express.Application) => {
  app.use(expressStatusMonitor())
  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan('tiny', {
    stream: {
      write: (message) => {
        logger.info(message)
      },
    },
  }))
  app.use(cookieParser())
  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3,
      },
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())
  app.use(lusca.csrf())
  app.use(lusca.xframe('SAMEORIGIN'))
  app.use(lusca.xssProtection(true))
  app.disable('x-powered-by')
  app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.moment = moment
    next()
  })

  // Handle Error
  if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler())
  } else {
    app.use((err: any, req: express.Request, res: express.Response, next: any) => {
      console.error(err)
      res.status(500).send('Server Error')
    })
  }

  // Authentication
  app.post(
    '/auth/login',
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/auth/login',
      successRedirect: '/',
    }),
  )

  app.use(pathMiddleware)
}

export = middlewareLoader
