module.exports = {
    REALM_APP_ID: process.env.REALM_APP_ID,
    STRIPE_API_KEY : process.env.STRIPE_API_KEY,
    AIRTABLE_API_KEY : process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID : process.env.AIRTABLE_BASE_ID,
    STRIPE_SERVER_URL : process.env.STRIPE_SERVER_URL || 'https://ccc-stripe-checkout.glitch.me',
    AIRTABLES : {
        PEOPLE : 'People',
        BOOKINGS : 'Bookings',
    }
    // more configs
}
