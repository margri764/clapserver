const {response} = require ('express');
const UserLogin = require ('../models/user-login');
const { v4: uuidv4 } = require('uuid');
const { getToken, getTokenData } = require('../helpers/jwt-generator');
const { getTemplate, sendEmail } = require('../config/confirmEmail.config');

const bcryptjs = require ('bcryptjs');


const signUp = async (req, res=response) => {
    
    try {

        // Obtener la data del usuario: name, email
        const { email, password } = req.body;

        // Verificar que el usuario no exista
        let user = await UserLogin.findOne({ email }) || null;

        if(user !== null) {
            return res.json({
                success: false,
                msg: 'Usuario ya existe'
            });
        }

        // Generar el código
        const code = uuidv4();

        // Crear un nuevo usuario
        user = new UserLogin({ password, email, code });

        // Generar token
        const token = getToken({ email, code });

        // Obtener un template
        const template = getTemplate(token);

        // Enviar el email
        await sendEmail(email, 'Este es un email de prueba', template);
        await user.save();

        res.json({
            success: true,
            msg: 'Registrado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }
}

const confirm = async (req, res) => {
    try {

       // Obtener el token
       const { token } = req.params;
       console.log(req.params);

       
       // Verificar la data
       const data = await getTokenData(token);

       if(data === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
       }


       const { email, code } = data.data;

       // Verificar existencia del usuario
       const user = await UserLogin.findOne({ email }) ;

       if(!user ) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
       }

       // Verificar el código
       if(code !== user.code) {
            return res.redirect('/error.html');
       }

       // Actualizar usuario
       user.status = 'VERIFIED';
       await user.save();

       // Redireccionar a la confirmación
       return res.redirect('/confirm.html');
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}






// const getUserById = async ( req, res ) =>{

//     const { id } = req.params;
//     console.log(id)

//    const  user =  await User.findById( id )

//     res.json( user );
// }





module.exports={
 
    // getUserById,
    signUp,
    confirm
}

