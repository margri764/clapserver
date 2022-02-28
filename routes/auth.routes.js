const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();
const { signUp, confirm, login,revalidateJWToken } = require('../controllers/auth.controllers');
const { setJWT } = require('../helpers/jwt-generator');
const { checkFields, checkToken } = require ('../middlewares');




router.post('/validate',[
    // check('email','el correo no es valido').isEmail(),
    // check('password','El password es obligatorio, mas de 6 letras').not().isEmpty(),
    // checkFields
],signUp);  

router.post('/login',[
],login);  

router.get('/confirm/:token',[
],confirm);  

// Validar y revalidar token
router.get( '/renew', checkToken, revalidateJWToken );

module.exports= router;
