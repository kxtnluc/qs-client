import { fetchStripeCharges, fetchStripeCustomers, fetchSubscriptionActivity } from "../../managers/stripeManager"

export const SubChecker = async (loggedInUser:any) => {

    // fetchStripeCharges().then((cArray) => console.log('Charges',cArray))

    const customers = await fetchStripeCustomers(loggedInUser.email)

    for (const c of customers.data) {
        const subscriptions = await fetchSubscriptionActivity(c.id);
        // console.log("Subscription",subscriptions)


        for (const subscription of subscriptions.data) {
            // console.log('subsubs', subscription);
            if (subscription.status === 'active') {
                return true;
            }
        }
    }

    return false;

    // fetchStripeCustomers(loggedInUser.email).then((cObj) => { //collects all Stripe Customers (cards) with the logged in user's email
    //     console.log('Customers',cObj.data)
    //     for (const c of cObj.data) { //for every customer (card) found under that email
    //         fetchSubscriptionActivity(c.id).then((sObj) => { //check if there is a subscription
    //             console.log('Subscriptions',sObj) //log that subscription, empty or otherwise
    //             //check if one of the subscriptions attached to a card is active
    //             for (const s of sObj.data) {
    //                 console.log('subsubs',s)
    //                 if(s.status === 'active'){
    //                     //if so, return TRUE
    //                     return true;
    //                 }
    //             }
    //         })
    //     }
    // })
    
    // //if not, return FALSE
    // return false;

}