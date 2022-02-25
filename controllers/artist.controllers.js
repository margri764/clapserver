

const {response} = require ('express');
const { v4: uuidv4 } = require('uuid');
const bcryptjs = require ('bcryptjs');

const ArtistAccount = require ('../models/artist-account');
const UserLogin = require ('../models/user-login');
const ArtistExperience = require('../models/artist-experience');
const ArtistEducation = require('../models/artist-education');
const ArtistSkills = require('../models/artist-skills');
const ArtistAbout = require('../models/artist-about');

const { getToken, getTokenData } = require('../helpers/jwt-generator');
const { getTemplate, sendEmail } = require('../config/confirmEmail.config');



const createArtistAccount = async (req, res=response) => {
    
    try {

        // Obtener la data del usuario: name, email
        const { email,  ...body } = req.body;

        // Verificar que el usuario no exista
        let user = await UserLogin.findOne({ email }) || null;

        if(user== null) {
            return res.status(400).json({
                success: false,
                msg: 'Usuario no existe o el email no esta verificado'
            });
        }

        const data ={
            ...body,
            email :email
        }
 
        // Crear un nuevo usuario
        const artist = new ArtistAccount( data );


        await artist.save();

        res.json( artist);

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al registrar usuario'
        });
}



}

const createExperience = async (req, res=response) => {

    
    try {

       
        const { uid, ...body } = req.body;

        const data ={
            ...body,
            user: uid
        }
  
        const experience = new ArtistExperience( data);
        await experience.save();
        res.json( experience );

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al agregar experiencia'
        });
}



}


const createEducation = async (req, res=response) => {

    
    try {

    
        const {uid,  ...body} = req.body;

        // const checkId = await UserLogin.findById({_id});

        // if(!checkId){
        //  return  res.status(400).json({msg:'no existe id en bd'})
        // }


        const data ={
            ...body,
            user: uid
        }
       
        const education = new ArtistEducation( data);
        await education.save();
        
        res.json({
            success: true,
            msg: 'Educacion agregada correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al agregar educacion'
        });
}



}

const createSkills = async (req, res=response) => {

    
    try {

    
        const {uid, ...body} = req.body;
        // console.table(body)

        // const checkId = await UserLogin.findById({_id});

        // if(!checkId){
        //  return  res.status(400).json({msg:'no existe id en bd'})
        // }
     
        const data ={
            ...body,
            user: uid
        }
       
       
        const skills = new ArtistSkills( data);
        await skills.save();
        
        res.json({
            success: true,
            msg: 'Skills agregadas correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al agregar skills'
        });
}



}

const createAbout = async (req,res=response)=>{

    try {

    
        const {uid, ...body} = req.body;
        // console.table(body)

        // const checkId = await UserLogin.findById({_id});

        // if(!checkId){
        //  return  res.status(400).json({msg:'no existe id en bd'})
        // }
     
        const data ={
            ...body,
            user: uid
        }
       
       
        const about = new ArtistAbout( data);
        await about.save();
        
        res.json({
            // msg: 'About agregado correctamente',
            about
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al agregar about'
        });
}

       
          
       
}

// ESTO ES PARA Q ME TRAIGA TODO DE UN ARTISTA!!! TENGO QUE CAMBIAR NOMBRE Y RUTA
// const getDataArtist = async (req,res=response)=>{

//     const {uid } = req.body

   
//     const education = await  ArtistEducation .find( {uid} );
//     const experience = await  ArtistExperience .find( {uid} );
//     const skills = await  ArtistSkills.find( {uid} );
//     const about = await ArtistAbout.find( {uid} );

//     res.json({
//         education,
//         experience,
//         skills,
//         about

//     });
// }

const getDataArtist = async (req,res=response)=>{
 
   
    const user = await  ArtistAccount.find( );
    res.json( {user} );
}

const getArtistExperience = async (req,res=response)=>{

    const {uid } = req.params
    const experience = await  ArtistExperience .find( {uid} );
    res.json({
        experience
    });
}


const getArtistEducation = async (req,res=response)=>{

    const {uid } = req.params
    const education = await  ArtistEducation.find( {uid} );
    res.json({
        education
    });
}
const getArtistByID = async (req,res=response)=>{

    const {uid } = req.params
    // const data ={
        
    //     user: uid
    // }
    const user = await  ArtistAccount.find( {user:uid} );
    // console.log(user)
    res.json({
        user
    });
}

const getAboutById = async (req,res=response)=>{

    const {uid } = req.params
    const about = await ArtistAbout.find( {uid} );
    // console.log(user)
    res.json({
        about
    });
}







module.exports={
    createExperience,
    createArtistAccount,
    createEducation,
    createSkills,
    getDataArtist,
    createAbout,
    getArtistExperience,
    getArtistEducation,
    getArtistByID,
    getAboutById
}

