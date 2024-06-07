const _apiUrl = 'https://api.stripe.com/v1'
const _apiKey = 'sk_test_51POmDpCU2ZnH6jjXNOHzqVsJNlhb8gP1GlNXAdktrp4X4eQMBs5jOBnqJo35E19azIdUWmbf2rIcxDMKP86vgAgV00Uwroguwx'

export const fetchStripeCustomers = () => {
    return fetch(_apiUrl+"/customers", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${_apiKey}`
        }
    }).then(
        (res) => res.json()
    )
}

export const fetchStripeCharges = () => {
    return fetch(_apiUrl+"/charges", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${_apiKey}`
        }
    }).then(
        (res) => res.json()
    )
}

export const fetchSubscriptionActivity = () => {
    return fetch(_apiUrl+"/subscriptions", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${_apiKey}`
        }
    }).then(
        (res) => res.json()
    )
}