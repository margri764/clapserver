

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

        // Verificar que el usuario  exista
        const user = await UserLogin.findOne({ email }) ;

        if(user==null) {
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

       
        const { id, ...body } = req.body;

        const data ={
            ...body,
            user: id
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

    
        const {id,  ...body} = req.body;


        const data ={
            ...body,
            user: id
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
    
        const {id, ...body} = req.body;
       
        const skills = new ArtistSkills( {user:id});
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
        const {id, ...body} = req.body;
    
        const data ={
            ...body,
            user: id
        }
       
       
        const about = new ArtistAbout( data);
        await about.save();
        
        res.json({  about  });

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

//     const {id } = req.body

   
//     const education = await  ArtistEducation .find( {id} );
//     const experience = await  ArtistExperience .find( {id} );
//     const skills = await  ArtistSkills.find( {id} );
//     const about = await ArtistAbout.find( {id} );

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

const getArtistExperienceById = async (req,res=response)=>{

    const { id } = req.params

    const experience = await  ArtistExperience.find( {user:id} );
    res.json({experience});
}


const getArtistEducationById = async (req,res=response)=>{

    const {id } = req.params
    const education = await  ArtistEducation.find( {user:id} );
    res.json({education});
}

const getArtistByID = async (req,res=response)=>{

    const {id} = req.params

    const user = await  ArtistAccount.findById( id);
 
    res.json({ user });
}

const getAboutById = async (req,res=response)=>{

    const {id } = req.params
    const about = await ArtistAbout.find( {user:id} );
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
    getArtistExperienceById,
    getArtistEducationById,
    getArtistByID,
    getAboutById
}

