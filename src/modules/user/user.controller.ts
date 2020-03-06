import { Response, Router } from 'express'
import { ResponseService } from '../core/service/responce.service';
import { asyncHandler } from './../../helpers/asyncHandler';
import { UserRepository } from './user.repository';
const userRouter = Router()

userRouter.post(
  '/create',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UserRepository.create(req.body)
    return ResponseService.success(res, 'User Berhasil di Buat', data)
  }),
)

const userController = Router()

userController.use('/user', userRouter)

export { userController }

