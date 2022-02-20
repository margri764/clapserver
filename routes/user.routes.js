const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();


const { usersGet,getUserById, createUserAccount } = require ('../controllers/user.controllers');

// const {  checkEmail, checkId } = require('../helpers/db-validators');

// const {checkToken, checkFields} = require('../middlewares/check-fields');

// const role = require('../models/role');


router.get('/', usersGet);    

router.post('/', 
[
    // check('name','El nombre es obligatorio').not().isEmpty(),
    // check('email','el correo es obligatorio').not().isEmpty(),
    // check('email','el correo no es valido').isEmail(),
    // check('email').custom( checkEmail),
    // check('password','El password es obligatorio, mas de 6 letras').isLength({min:6}),
    // check('role').custom( isRoleValid),
    // checkFields
],createUserAccount);

router.get('/:id',[

    // check('id', 'no es un id de Mongo valido').isMongoId(),
    // check('id').custom( checkProduct),
    // checkFields,
],getUserById);

// router.put('/:id', 
// [
//     check('id','No es un id valido de mongoDB').isMongoId(),
//     check('id').custom( checkId ),
//     check('role').custom( isRoleValid),
//     checkFields
// ],usersPut);


// router.delete('/:id',
// [
//     checkToken,
//     // adminRole,
//     multiRole ('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
//     check('id','No es un id valido de mongoDB').isMongoId(),
//     check('id').custom( checkId ),
//     checkFields
// ], usersDelete);


module.exports=router;