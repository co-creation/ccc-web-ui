module.exports = {
    REALM_APP_ID: process.env.REALM_APP_ID || "ccc-nlxqd",
    STRIPE_API_KEY : process.env.STRIPE_API_KEY || 'pk_test_51ITrEEFAZqFT78KS1bwkuBnhEnUlOHosHEup1jX5gd9eCzrVzIHvkR4AgtuNuHELdYlJJKTIQirjktNvtKgX2aMt00QIuzR0jA', // test key
    AIRTABLE_API_KEY : process.env.AIRTABLE_API_KEY || 'keyI1H52NQ1CMV0kE',
    AIRTABLE_BASE_ID : process.env.AIRTABLE_BASE_ID || 'applOIkbauBMvMvM2',
    AIRTABLES : {
        PEOPLE : 'People',
        BOOKINGS : 'Bookings',
    }
    // more configs
}
