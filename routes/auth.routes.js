const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();
const { login, googleSignIn } = require('../controllers/auth.controllers');
const { checkFields } = require ('../middlewares');


router.post('/google',[
    // check('idToken','el id_token es necesario').not().isEmpty(),
    // checkFields
],googleSignIn);  

module.exports= router;
