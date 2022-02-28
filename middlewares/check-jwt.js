
const jwt = require ('jsonwebtoken');
const UserLogin = require('../models/user-login');
// const Usuario = require ('../models/usuario');


const checkToken = async ( req , res, next)=>{

    const token = req.header ( 'token' ); 
    console.log('check')

    if(!token){ 
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }

    try {

               
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
       
        const userAuth = await UserLogin.findById( uid );

        if(!userAuth){
            return res.status(401).json({
                success:false,
                msg:'Token no valido - Usuario no existe en DB'
            })
        }

        if(!userAuth.state){
            return res.status(401).json({
                success:false,
                msg:'Token no valido - usuario con state en false'
            })
        }

        req.userAuth= userAuth;

        next(); 

    } catch (error) {
        return res.status(401).json({ 
            success: false,
            msg: 'token no valido'
    })




 }
}

module.exports={checkToken};