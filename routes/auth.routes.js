const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();
const { signUp, confirm } = require('../controllers/auth.controllers');
const { checkFields } = require ('../middlewares');




router.post('/login',[
    check('email','el correo no es valido').isEmail(),
    check('password','El password es obligatorio, mas de 6 letras').not().isEmpty(),
    checkFields
],signUp);  

router.get('/confirm/:token',[
],confirm);  

module.exports= router;
