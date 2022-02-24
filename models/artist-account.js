

const {Schema, model} = require ('mongoose');

const ArtistAccount = Schema({
    
    userName : {
        type: String,
        default: ''
    },
    
    city : {
        type: String,
        required: true
    },
    
    state: {
        type: String,
        default: ''
    },
    
    website : {
        type: String,
        default: ''
    },
    
    email :{
        type: String,
        required: true
    },

    dateBirth : {
        type: Date,
        required: true
    },

    jobDate : {
        type: String,
        required:true
    },
    
    alias : {
        type: String,
        required : true
    },

    titular : {
        type: String,
        required : true
    },
    
    avatar : {
        type: String,

    },

    type : {
        type: String,
  
    },

// no vi desde donde se carga el pais
    country : {
        type: String,
         default: ''
    },


    status : {
        type: Boolean,
        default: true
    },
    
    
    createdAT : {
        type: Date,
        default: ''
    },
    
    updatedAT : {
        type: Date,
        default: ''
    }

  
});

ArtistAccount.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('ArtistAccount', ArtistAccount);