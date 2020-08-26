import { body } from 'express-validator';
import Menu from './menu.model';

const MenuCreateValidation = [
  body('code')
    .not()
    .isEmpty()
    .withMessage('Kode diperlukan'),
  body('name')
    .not()
    .isEmpty()
    .withMessage('Nama menu diperlukan'),
  body('path')
    .not()
    .isEmpty()
    .withMessage('Path menu diperlukan'),
  body('code').custom(async code => {
    return Menu.findOne({ where: { code } }).then(menu => {
      if(menu) {
        return Promise.reject('Kode sudah digunakan')
      }
    });
  }),
  body('path').custom(async path => {
    return Menu.findOne({ where: { path } }).then(path => {
      if(path) {
        return Promise.reject('Path sudah digunakan')
      }
    });
  }),
];

export { MenuCreateValidation };

