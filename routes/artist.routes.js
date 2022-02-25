

const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();
const { checkFields } = require ('../middlewares');
const { createEducation , createExperience , createSkills, createArtistAccount, getDataArtist, createAbout,
getArtistExperience, getArtistEducation, getArtistByID, getAboutById } = require('../controllers/artist.controllers');



router.post('/experience',[ ],createExperience);  

router.get('/experience/:id',[ ], getArtistExperience);  

router.post('/education',[ ],createEducation); 
router.get('/education/:id',[ ], getArtistEducation);   

router.post('/skills',[ ],createSkills);  

router.post('/create-profile',[ ],createArtistAccount);  

router.post('/about',[ ],createAbout);  
router.get('/about/:id',[ ],getAboutById);  



router.get('/all',[ ], getDataArtist);  
router.get('/:id',[ ], getArtistByID);  




module.exports= router;
