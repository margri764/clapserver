const {Schema, model} = require ('mongoose');

const UserLoginSchema = Schema({

    // name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String, required: true },
    code: { type: String, required: true },
    status: { type: String, required: true, default: 'UNVERIFIED' }
    
    // firstName : {
    //     type: String,
    //  default: ''
       
    // },
    
    // lastName : {
    //     type: String,
    //  default: ''

    // },

    // userName : {
    //     type: String,
    //     default: '',

    // },

    // realm : {
    //     type: String,
    //  default: ''

    // },

    // email : {
    //     type: String,
    //     require: true
    // },

    // emailVerified : {
    //     type: Boolean,
    //     default: false
    // },

    // password : {
    //     type: String,
    //     require: true
    // },

    // createdAt : {
    //     type: Date,
    //     default: ''

    // },

    // updateAT : {
    //     type: Date,
    //      default: ''

    // },

    // roold : {
    //     type: String,
    //     default: 'user'
    
    // },
    

        

  
});

UserLoginSchema.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('UserLogin', UserLoginSchema);