


const {Schema, model} = require ('mongoose');


const ArtistExperience = Schema({

        jobTitle:{
            type: String,
            // required : true
        },
        companyName:{
            type: String,
            // required : true
        },
        type:{
            type: String,
            // required : true
        },
        linkPortfolio:{
            type: String,
            // required : true
        },
        startDate:{
            type: Date,
            // required : true
        },
        endDate:{
            type: Date,
            // required : true
        },
        country:{
            type: String,
            // required : true
        },
        description:{
            type: String,
            // required : true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: "ArtistAccount",
            // required: true
        }
        

});



ArtistExperience.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('ArtistExperience', ArtistExperience);

