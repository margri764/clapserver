





const {Schema, model} = require ('mongoose');


const ArtistAbout = Schema({

    about:{
        type: String,
        // required : true
    },
  
    user:{
        type: Schema.Types.ObjectId,
        ref: "ArtistAccount",
        // required: true
    }

});



ArtistAbout.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('ArtistAbout', ArtistAbout);

