

const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();
const { checkFields } = require ('../middlewares');
const { createEducation , createExperience , createSkills, createArtistAccount, getDataArtist, createAbout} = require('../controllers/artist.controllers');



router.post('/experience',[ ],createExperience);  

router.post('/education',[ ],createEducation);  

router.post('/skills',[ ],createSkills);  

router.post('/create-profile',[ ],createArtistAccount);  

router.post('/about',[ ],createAbout);  


router.get('/',[ ], getDataArtist);  



module.exports= router;
