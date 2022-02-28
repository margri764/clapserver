const {response} = require ('express');
const { v4: uuidv4 } = require('uuid');
const bcryptjs = require ('bcryptjs');
const UserLogin = require ('../models/user-login');
const { getToken, getTokenData, setJWT } = require('../helpers/jwt-generator');
const { getTemplate, sendEmail } = require('../config/confirmEmail.config');




const signUp = async (req, res=response) => {
    
    try {

        // Obtener la data del usuario: name, email
        const { email, password } = req.body;

        // Verificar que el usuario no exista
        //dice que busque un email y puede ser que este en null, dice "buscalo o sino devolve null"
        let user = await UserLogin.findOne({ email }) || null;

       if(user != null){
        if(user.status=='VERIFIED'  ) {
 
            return res.status(401).json({
                success: false,
                msg: 'Usuario verificado, dirijase al Login'
            });
        }
        if( user.status=='UNVERIFIED'){
            return res.status(401).json({
                success: false,
                msg: 'Usuario en proceso de verificacion, consulte su email'
            });
        }
    }
 

        // Generar el código
        const code = uuidv4();

        // Crear un nuevo usuario
        user = new UserLogin({ password, email, code });

        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password,salt);

        // Generar token
        const token = getToken({ email, code });

        // Obtener un template
        const template = getTemplate(token);

        // Enviar el email
        await sendEmail(email, 'Este es un email de prueba', template);
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Registrado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }
}

const confirm = async (req, res) => {
    try {

       // Obtener el token
       const { token } = req.params;
    //    console.log(req.params);

       
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
       const user = await UserLogin.findOne({ sendEmail }) ;

       if(!user ) {
            return res.status(400).json({
                success: false,
                msg: 'Usuario no existe'
            });
       }

    //    Verificar el código
       if(code !== user.code) {
        return res.status(400).json({
            success: false,
            msg: 'Error en la confirmacion, vuelva a intentar'
        });
       }

       // Actualizar usuario
       user.status = 'VERIFIED';
       await user.save();

    //    // Redireccionar a la confirmación
    //    return res.redirect('/confirm.html');
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}


const login = async (req, res=response)=>{

    const {email, password} = req.body;

   try {
        const user = await UserLogin.findOne({email});
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: 'Usuario no registrado, dirijase a Registro'
            });
        }

        if(user.status == 'UNVERIFIED') {
            return res.status(400).json({
                success: false,
                msg: 'Usuario en proceso de verificacion, revise su Email'
            })
        }

        const checkPassword = bcryptjs.compareSync(password, user.password)
        if(!checkPassword) {
            return res.status(400).json({
                success: false,
                msg: 'Password incorrecto'
            })
        }
console.log(user);
        const token = await setJWT(user.id);
         res.json({
            success: true,
            id:user.id,
            email:user.email,
            statusAccount : user.statusAccount,
            token
            })
   } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador'
        })       
    }
}


const revalidateJWToken = async(req, res = response ) => {

    const { id } = req.header('token');
    console.log('revalidate')

    // Generar el JWT
    const token = await setJWT( id );

    return res.json({
        success: true,
        id, 
        token
    });

}




module.exports={
    login, 
    signUp,
    confirm,
    revalidateJWToken
}

