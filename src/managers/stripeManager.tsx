const _apiUrl = 'https://api.stripe.com/v1'
const _apiKey = 'sk_test_51POmDpCU2ZnH6jjXNOHzqVsJNlhb8gP1GlNXAdktrp4X4eQMBs5jOBnqJo35E19azIdUWmbf2rIcxDMKP86vgAgV00Uwroguwx'

export const fetchStripeCustomers = (email:string) => {
    return fetch(_apiUrl+`/customers?email=${email}`, {
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

export const fetchSubscriptionActivity = (customerId:string) => {
    return fetch(_apiUrl+`/subscriptions?customer=${customerId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${_apiKey}`
        }
    }).then(
        (res) => res.json()
    )
}

//Subscription Customer ID: cus_QFI7P4vELCLWhW
//Customer ID for kxtnluc with real card:  cus_QFI7P4vELCLWhW
//Customer ID for kxtnluc with fake card:  cus_QFGv0y2HebjWEH
