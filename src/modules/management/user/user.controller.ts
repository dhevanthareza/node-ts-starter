import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import ValidateService from '../../core/service/validate.service';
import { UserRepository } from './user.repository';
import { UserCreateValidations } from './user.validations';

const UserController = Router();
UserController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.getAll();
    res.json(user);
  }),
);
UserController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const user = await UserRepository.datatable(req.query.search);
    res.json(user);
  }),
);
UserController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.get(req.query.id);
    res.json(user);
  }),
);
UserController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    req.user = {id: 1}
    await ValidateService(req, UserCreateValidations);
    const user = await UserRepository.create(req.user, req.body);
    res.json(user);
  }),
);
UserController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.get(req.query.id);
    res.json(user);
  }),
);
UserController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.get(req.query.id);
    res.json(user);
  }),
);

export default UserController;
