const dbValidators = require('./db-validators');
const JWTGenerator = require('./jwt-generator');
const googleVerify = require('./google-verify');
// const uploadFiles = require('./upload-files');




module.exports={
    ...dbValidators,
    ...JWTGenerator,
    ...googleVerify,
    // ...uploadFiles,
}
