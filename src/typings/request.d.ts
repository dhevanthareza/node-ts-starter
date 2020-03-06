import { Request } from "express"
import User from "../modules/user/user.model"
export interface HRISRequest extends Request {
  user: User,
  userRoles: object,
}
