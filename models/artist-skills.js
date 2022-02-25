




const {Schema, model} = require ('mongoose');


const ArtistSkills = Schema({


        type:{
            type: Object,
            // required:true
        },
        
        user:{
            type: Schema.Types.ObjectId,
            ref: "ArtistAccount",
            // required: true
        }
      
        

});



ArtistSkills.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('ArtistSkills', ArtistSkills);

