const {Schema, model} = require ('mongoose');

const UserSchema = Schema({
    
    firstName : {
        type: String,
     default: ''
       
    },
    
    lastName : {
        type: String,
     default: ''

    },

    userName : {
        type: String,
        default: '',

    },

    realm : {
        type: String,
     default: ''

    },

    email : {
        type: String,
        require: true
    },

    emailVerified : {
        type: Boolean,
        default: false
    },

    password : {
        type: String,
        require: true
    },

    createdAt : {
        type: Date,
        default: ''

    },

    updateAT : {
        type: Date,
         default: ''

    },

    roold : {
        type: String,
        default: 'user'
    
    },
    // name:  {
    //     type:String,
    //     required: true
    // },

    // alias:  {
    //     type:String,
    //     required: true
    // },

    // titular:  {
    //     type:String,
    //     required: true
    // },

    // web:  {
    //     type:String,
    //     required: true
    // },

    // email: {
    //     type: String,
    //     required: true,
    //     // unique: true,
    //     },
    
    // dateBirth:  {
    //     type: Date,
    //     required: true
    // },    

        

  
});

UserSchema.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('User', UserSchema);