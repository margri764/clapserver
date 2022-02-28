const {Schema, model} = require ('mongoose');

const UserLoginSchema = Schema({

    // name: { type: String, required: true },
    email: {
         type: String, 
         required: true,
         unique: true 
    },

    password:{
        type:String,
        required: true 
    },
    code: { 
        type: String,
        required: true 
        },

    statusAccount :{
        type: Boolean,
        default: false
    },   

    status: {
         type: String,
         required: true,
         default: 'UNVERIFIED' }
    
  
});

UserLoginSchema.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('UserLogin', UserLoginSchema);