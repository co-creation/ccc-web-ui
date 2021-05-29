import PasswordValidator from 'password-validator'
import validate from 'validator'

const passwordSchema = new PasswordValidator()
passwordSchema
  .is().min( 8 ) // Minimum length 8
  .is().max( 100 ) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits( 2 ) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf( ['Passw0rd', 'Password123', 'CCC2021'] ); // Blacklist these values

const email = ( emailVal, errMsg = 'Email format is invalid' ) => {
  console.log( 'email val', validate.isEmail( emailVal ) || errMsg )
  return validate.isEmail( emailVal ) || errMsg
}

const password = ( pass, errMsg = 'Password doesn\'t meet requirements' ) => passwordSchema.validate( pass ) || errMsg

export default {
  password,
  email,
}
