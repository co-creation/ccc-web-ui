module.exports = {
    REALM_APP_ID: process.env.REALM_APP_ID || "ccc-nlxqd",
    STRIPE_API_KEY : process.env.STRIPE_API_KEY || 'pk_live_51ITrEEFAZqFT78KS7vQ7Cyq9atlWQ7J7bcd9NQqSUmnXOqYQUT75kj2idGDQapozD5QyEwoxLy5UR4Cv0xL9E34r00By9xuq0u',
    AIRTABLE_API_KEY : process.env.AIRTABLE_API_KEY || 'keyI1H52NQ1CMV0kE',
    AIRTABLE_BASE_ID : process.env.AIRTABLE_BASE_ID || 'applOIkbauBMvMvM2',
    STRIPE_SERVER_URL : process.env.STRIPE_SERVER_URL || 'https://ccc-stripe-checkout.glitch.me',
    AIRTABLES : {
        PEOPLE : 'People',
        BOOKINGS : 'Bookings',
    }
    // more configs
}
