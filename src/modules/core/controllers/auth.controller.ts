import { Router } from 'express'
import { asyncHandler } from '../helpers/asyncHandler'
import { AuthService } from '../service/auth.service'
import { ResponseService } from '../service/response.service'

const AuthController = Router()
AuthController.post(
  '/login',
  asyncHandler(async (req: any, res: any) => {
    const { password } = req.body
    const username= req.body.email || req.body.phone
    const data = await AuthService.login(username, password)
    return ResponseService.success(res, data, 'Berhasil Login')
  }),
)

export default AuthController

