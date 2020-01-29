import { Request, Response, Router } from 'express'
import { isAuthenticated, passport } from '../config/passport'
const authRouter = Router()

authRouter.get(
  '/login',
  async (req: Request, res: Response) => {
    res.render('login.pug', {
      errors: req.flash('error'),
    })
  },
)

authRouter.get(
  '/logout',
  isAuthenticated,
  async (req: Request, res: Response) => {
    req.session.destroy((error: Error) => {
      if (error) { throw Error(error.message) }
      res.redirect('/auth/login')
    })
  },
)

authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/auth/login',
    successRedirect: '/',
  }),
)

const authController = Router()

authController.use('/auth', authRouter)

export { authController }

