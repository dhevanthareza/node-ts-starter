import { body } from 'express-validator';
const barangCreateValidation = [
  body('code')
    .not()
    .isEmpty()
    .withMessage('Kode diperlukan'),
  body('name')
    .not()
    .isEmpty()
    .withMessage('Nama diperlukan'),
  body('hargaPokok')
    .not()
    .isEmpty()
    .withMessage('Harga pokok diperlukan'),
  body('hargaJual')
    .not()
    .isEmpty()
    .withMessage('Harga jual diperlukan'),
  //  custom validation example
  // body('code').custom(async code => {
  //   return Role.findOne({ where: { code } }).then(menu => {
  //     if(menu) {
  //       return Promise.reject('Kode sudah digunakan')
  //     }
  //   });
  // }),
  body('hargaJual').custom(async (hargaJual, { req }) => {
    if (  hargaJual < req.body.hargaPokok) {
      throw new Error('Harga jual harus lebih besar dari harga pokok')
    }
    return true;
  }),
];

export { barangCreateValidation };

