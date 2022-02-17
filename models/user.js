const {Schema, model} = require ('mongoose');

const UserSchema = Schema({
    
    name:  {
        type:String,
        required: true
    },

    alias:  {
        type:String,
        required: true
    },

    titular:  {
        type:String,
        required: true
    },

    web:  {
        type:String,
        required: true
    },

    email: {
        type: String,
        required: true,
        // unique: true,
        },
    
    dateBirth:  {
        type: Date,
        required: true
    },    

        

  
});

UserSchema.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    // const {__v,password,_id,...usuario} = this.toObject();
    // usuario.uid= _id;
    return rest; 
}


module.exports= model('User', UserSchema);