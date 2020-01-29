import { Request } from "express"
import { User } from "../modules/core/models/user.model"
export interface HRISRequest extends Request {
  user: User,
  userRoles: object,
}
