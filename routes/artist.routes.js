

const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();
const { checkFields } = require ('../middlewares');
const { createEducation , createExperience , createSkills, createArtistAccount, getDataArtist, createAbout,
getArtistExperienceById, getArtistEducationById, getArtistByID, getAboutById } = require('../controllers/artist.controllers');



router.post('/experience',[ ],createExperience);  

router.get('/experience/:id',[ ], getArtistExperienceById);  

router.post('/education',[ ],createEducation); 
router.get('/education/:id',[ ], getArtistEducationById);   

router.post('/skills',[ ],createSkills);  

router.post('/create-profile',[ ],createArtistAccount);  

router.post('/about',[ ],createAbout);  
router.get('/about/:id',[ ],getAboutById);  



router.get('/',[ ], getDataArtist);  
router.get('/:id',[ ], getArtistByID);  




module.exports= router;
