/**
 * @function parseUserBookings
 * @param {Object} userBookings: fn expects this shape to match { bookings } = useAirtable()
 * @returns {Object} an object containing all bed spots from userBookings [dateString] = bedName
 */
export default function parseUserBookings( userBookings ) {
  const bookingsList = Object.values( userBookings )
  const daysString = bookingsList.map( ( booking ) => booking['Date - Bed Spot Rollup'] ).join( ',' )
  const days = daysString.split( ',' ).map( ( row ) => row.split( '   ' ) )
  const bookingsObject = []
  days.forEach( ( day ) => {
    const [date, bedName] = day
    bookingsObject[date] = bedName
  } )
  return bookingsObject
}
