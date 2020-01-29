import bcrypt from 'bcrypt-nodejs'
import { NextFunction, Response } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { logger } from '../../../helpers/logger'
import { HRISRequest } from '../../../typings/request'
import User from '../models/user.model'

passport.serializeUser<User, any>((user, done) => {
  done(null, user.id)
})

passport.deserializeUser<User, any>((id, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch((error) => done(error))
})

/**
 * Sign in using username and password
 */
passport.use(new LocalStrategy({
  passReqToCallback: true,
  passwordField: 'password',
  session: true,
  usernameField: 'username',
}, async (req, username, password, done) => {
  try {
    logger.debug('Passport Local Strategy', username)
    console.log('local', username, password)
    const user = await User.findOne({ where: { username } })
    if (!user) {
      throw Error('Username tidak ditemukan')
    }
    logger.debug('Passport Local Strategy', user.fullname)

    const result = bcrypt.compareSync(password, user.password)
    if (!result) {
      throw Error('Username atau password salah')
    }

    return done(null, user)
  } catch (error) {
    logger.debug('Passport Local Strategy', error)
    return done(null, false, { message: error.message })
  }
}))

/**
 * Login Required middleware.
 */
const isAuthenticated = (req: HRISRequest, res: Response, next: NextFunction) => {
  if (process.env.AUTH_DISABLED === 'yes') { return next() }
  if (req.isAuthenticated()) {
    return next()
  }
  req.session.afterLoginUrl = req.path
  res.redirect('/auth/login')
}

export { isAuthenticated, passport }

