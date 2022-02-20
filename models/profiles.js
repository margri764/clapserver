

const {Schema, model} = require ('mongoose');

const ProfileSchema = Schema({
    
    userName : {
        type: String,
        default: ''
       
    },
    
    name : {
        type: String,
     default: ''

    },

    banner : {
        type: String,
        default: '',

    },

    avatar : {
        type: String,
     default: ''

    },

    type : {
        type: String,
        require: true
    },

    profileData : {
        type: Object,
    },

    city : {
        type: String,
        require: true
    },

    state: {
        type: String,
        default: ''
    },

    country : {
        type: String,
         default: ''
    },

    website : {
        type: String,
        default: ''
    },
    
    status : {
        type: String,
        default: ''
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

ProfileSchema.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('Profile', ProfileSchema);