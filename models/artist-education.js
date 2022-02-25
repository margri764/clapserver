



const {Schema, model} = require ('mongoose');


const ArtistEducation = Schema({

    education:{
        type: String,
        // required : true
    },
    degree:{
        type: String,
        // required : true
    },
    school:{
        type: String,
        // required : true
    },
    startDate:{
        type: Date,
        // required : true
    },
    country:{
        type: String,
        // required : true
    },
    city:{
        type: String,
        // required : true
    },
    endDate:{
        type: Date,
        // required : true
    },
    modo:{
        type: String,
        // required : true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "ArtistAccount",
        // required: true
    }

});



ArtistEducation.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('ArtistEducation', ArtistEducation);

