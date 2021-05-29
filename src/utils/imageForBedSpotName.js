import {
  BedroomAdrienneMareeBrown,
  BedroomElizabethWarren,
  BedroomHesterFord,
  BedroomJohnLewis,
  BedroomMaryAshtonQueen,
  BedroomMaryAshtonSingle,
  BedroomVirginiaWoolf,
} from '../assets/images'
/**
 * @function imageForBedSpotName
 * @param {String} bedSpotName The bed spot name to match with a photo
 * @returns {Image} an image object corresponding to the room name
 */
export default function imageForBedSpotName( bedSpotName ) {
  if ( typeof bedSpotName !== 'string' ) {
    throw new Error( `[imageForBedSpotName] expected a string for the argument bedSpotName but received ${typeof bedSpotName}` )
  }
  if ( bedSpotName.trim().endsWith( 'Elizabeth Warren' ) ) return BedroomElizabethWarren
  if ( bedSpotName.trim().endsWith( 'Queen Bed In Mary Ashton' ) ) return BedroomMaryAshtonQueen
  if ( bedSpotName.trim().endsWith( 'Virginia Woolf' ) ) return BedroomVirginiaWoolf
  if ( bedSpotName.trim().endsWith( 'Single Bed In Mary Ashton' ) ) return BedroomMaryAshtonSingle
  if ( bedSpotName.trim().endsWith( "Hester Ford's Loft" ) ) return BedroomHesterFord
  if ( bedSpotName.trim().endsWith( "Adrienne Maree-Brown's BeeThrive" ) ) return BedroomAdrienneMareeBrown
  if ( bedSpotName.trim().endsWith( 'John Lewis' ) ) return BedroomJohnLewis
  throw new Error( `unrecognized bedspot name '${bedSpotName}' passed to imageForBedSpotName()` )
}
