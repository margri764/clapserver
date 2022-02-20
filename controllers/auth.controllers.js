const {response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const { JWTGenerator, googleVerify } = require('../helpers');


const firstRegister = async (req , res =response) => {

    const {email, password, ...body} = req.body;


    try {
        const checkEmail = await User.findOne({email});

        if(checkEmail) {
            return res.status(400).json({
                msg: 'Usuario existe'
            });
        }

        

            const data = {
                ...body,
                email,
                password
                // firstName: firstName,
                // lastName,
                // userName,
                // realm,
                // email : email,
                // emailVerified,
                // password: user.password,
                // createdAt,
                // updateAT,
                // roold,
            }

            const user = new User (data);
            // const salt = bcryptjs.genSaltSync(); 
            // user.password = bcryptjs.hashSync(password,salt);
            await user.save();

        

        // if(!userDb.state) {
        //     return res.status(400).json({
        //         msg: 'Usuario no activo en BD'
        //     })
        // }



        // const checkPassword = bcryptjs.compareSync(password, userDb.password)
        // if(!checkPassword) {
        //     return res.status(400).json({
        //         msg: 'Pasword incorrecto'
        //     })
        // }

        // const token = await generarJWT(usuario.id);
        res.json({
            user
            // token

        })
   } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador'
        })       
    }


}

const login = async (req, res=response)=>{

    const {email, password} = req.body;

   try {
        const userDb = await User.findOne({email});
        if(!userDb) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            });
        }

        if(!userDb.state) {
            return res.status(400).json({
                msg: 'Usuario no activo en BD'
            })
        }

        const checkPassword = bcryptjs.compareSync(password, userDb.password)
        if(!checkPassword) {
            return res.status(400).json({
                msg: 'Pasword incorrecto'
            })
        }
        // const token = await generarJWT(usuario.id);
        res.json({
            userDb,
            // token

        })
   } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador'
        })       
    }
}

const googleSignIn = async ( req, res) => {

    console.log(req.body);
    // const { idToken } = req.body;       
    
    // try {
        
    //     const { name, img, email } = await googleVerify(idToken); 
   
      
    //     let usuario = await Usuario.findOne( {email} );
    //     let resToFront= "exitsUserInDB";

    //     if(!usuario){
    //         const data={
    //             name,
    //             email,
    //             img,
    //             password:'sin password - usuario de google',
    //             google: true
    //     };
    //         usuario = new Usuario (data)
    //         await usuario.save()
    //     }
      

    //     if(!usuario.state){
    //         return res.status(401).json({
    //             msg: 'hable con el administrador, usuario bloqueado'
    //         });
    //     }
    //     const token = await generarJWT(usuario.id);

    //     res.json({
    //         // usuario,
    //         // token   
    //         // email
    //         resToFront
                 
           
    //     });
        
    // } catch (error) {

    //     res.status(400).json({
    //         msg: 'Token de Google no es válido'
    //     })
    // }
}

module.exports={
    login,
    googleSignIn,
    firstRegister
}

