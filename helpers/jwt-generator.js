const jwt = require('jsonwebtoken');

const getToken = (payload) => {
    return jwt.sign({
        data: payload
    }, 'SECRET', { expiresIn: '1h' });
}

const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, 'SECRET', (err, decoded) => {
        if(err) {
            console.log('Error al obtener data del token');
        } else {
            data = decoded;
        }
    });

    return data;
}

const setJWT = ( id ) =>{ 
    console.log('SETJWT',id);
 
    

    return new Promise( (resolve, reject) =>{

        const payload = { id }; 

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{ 

            expiresIn:'24h' 

        }, (err,token)=>{ 
            if(err){
                console.log(err);
                reject( 'no se pudo generar el JWT')
            }else{
                resolve ( token );
         }
        })

    })


}



module.exports = {
    getToken,
    getTokenData,
    setJWT
}