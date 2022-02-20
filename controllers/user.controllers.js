const {response} = require ('express');
const bcryptjs = require ('bcryptjs');
const User = require ('../models/user');
const Profile = require ('../models/profiles')

// const isEmailVerified = async ( query ='', res) => {

//     const isEmailVerified = ObjectId.isValid ( query );
    
//     if ( isEmailVerified ){
//         const verified = await User.findById(query).populate('email');
//         return res.json({
//             results: ( verified) ? [ verified ] : []
//         })
//     }

//     const regex = new RegExp ( query, 'i');

//     const isTrue = await User.find({email: regex, state:true}).populate('email');

//     return res.json({
//         results: isTrue
//     })
// }


const createUserAccount= async (req, res = response) => {
    
    
    // console.log(req.body)
    
    const {  email, ...body }= req.body
    
    try {
        const verified = await User.findOne({email});
    
        if ( !verified ){
            return res.status(400).json({msg: "no es un email valido"  })
        }
    
        // const regex = new RegExp ( _id, 'i');
    
        const isTrue = await User.find({email:email,emailVerified:true});

        if(!isTrue.length > 0 ){
            return res.status(400).json({msg: "no es un email verificado"  })
        }
     
         const user = new Profile ({email, ...body});
    
    // const salt = bcryptjs.genSaltSync(); 
    // user.password = bcryptjs.hashSync(password,salt);

        await user.save();
   
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con  marcelo'
        })    
        
    }
   
    // // const checkEmail = await User.findOne({email});
    // // if(checkEmail){
    // //     return res.status(400).json({
    // //         msg:` El email ${checkEmail.email} ya esta registrado en nuestra base de datos `
    // //     });
    // // }
    
    // const user = new User ({email, ...body});
    
    // // const salt = bcryptjs.genSaltSync(); 
    // // user.password = bcryptjs.hashSync(password,salt);

    // await user.save();
}




const getUserById = async ( req, res ) =>{

    const { id } = req.params;
    console.log(id)

   const  user =  await User.findById( id )
//    .populate ('user','name');
    // .populate ('category','name');
    res.json( user );
}


const usersGet = async (req,res=response)=>{

    const { limit , from }=req.query;
    const [ total, usuarios] = await Promise.all([
        User.countDocuments( {state:true}),
        User.find( {state:true} )
            .skip( Number (from))
            .limit( Number (limit))
    ])  
   

    res.json({ 
        // total,     
      usuarios

    });
}

const usersPut= async (req, res) => {
    
    const { id } = req.params;
    const { _id, password,google, ...rest } = req.body;
    
    if( password ){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id,rest );

    res.json({    
        msg:'put API - controller',
        usuario, 
        id
    });
}

const usersDelete= async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{state:false})
    const usuarioAuth = req.usuarioAuth;

    res.json({       
        usuario,
        usuarioAuth
        
    });
}


module.exports={
    usersGet,
    usersPut,
    usersDelete,
    getUserById,
    createUserAccount
}