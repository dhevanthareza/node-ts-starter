import { body } from 'express-validator';
import User from './user.model';

const UserCreateValidations = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('Username diperlukan'),
  body('email')
    .isLength({ min: 2 })
    .withMessage('minimal 10 karakter'),
  body('email').custom(async email => {
    return User.findOne({ where: { email } }).then(user => {
      if (user) {
        return Promise.reject('Email sudah digunakan')
      }
    });
  }),
];

export { UserCreateValidations };

