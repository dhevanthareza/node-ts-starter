import { Request, Response, Router } from 'express'
import { isAuthenticated } from '../config/passport'

const homeController = Router()

homeController.get(
  '/',
  isAuthenticated,
  async (req: Request, res: Response) => {
    res.render('home.pug')
  },
)

export { homeController }
