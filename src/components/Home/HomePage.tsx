import { Button } from "reactstrap"
import "./HomePage.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { fetchStripeCharges, fetchStripeCustomers, fetchSubscriptionActivity } from "../../managers/stripeManager"

export const HomePage = ({loggedInUser}:any) => {

    const [customers, setCustomers] = useState([])

    console.log(loggedInUser)
    const navigate = useNavigate();

    const handleGetStarted = () => {
        console.log('asdhaudhauisdhiasuhuidshguied')

        // if(loggedInUser) navigate("/myhome")
            // else navigate("/login")

        fetchSubscriptionActivity().then((cArray) => {
            console.log(cArray)
            setCustomers(cArray)
        })

    }

    return (
        <main className="hp-main">
            <section className="hp-section-header">
                <div className="hp-header-one">
                    Record, Edit, and Manage
                </div>
                <div className="hp-header-two">
                    YOUR DATA
                </div>
                <div className="hp-header-three">
                    <i>Simply, Securly, and Efficiently</i>
                </div>
            </section>
            <section className="hp-section-getstarted">
                <div className="hp-btn-div">
                    <Button onClick={handleGetStarted} className="hp-btn" size="lg" color="primary" variant="contained">Get Started</Button>
                </div>
            </section>
        </main>
    )
}