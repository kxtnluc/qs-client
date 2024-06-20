import { Button } from "reactstrap"
import "./MobileHomePage.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { fetchStripeCharges, fetchStripeCustomers, fetchSubscriptionActivity } from "../../../managers/stripeManager"
import { SubChecker } from "../../scripts/SubChecker"

export const MobileHomePage = ({loggedInUser}:any) => {

    const [customers, setCustomers] = useState([])

    console.log(loggedInUser)
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if(loggedInUser) navigate("/myhome")
            else navigate("/login")
    }

    return (
        <main className="m-hp-main">
            <section className="m-hp-section-header">
                <div className="m-hp-header-one">
                    <div className="header-one-div">Manage</div>
                    <div className="header-one-div">Record </div>
                    <div className="header-one-div">Edit </div>
                    
                </div>
                <div className="m-hp-header-two">
                    YOUR DATA
                </div>
                <div className="m-hp-header-three">
                    <div className="header-three-div">Simply</div>
                    <div className="header-three-div">Securly</div>
                    <div className="header-three-div">Efficiently</div>
                </div>
            </section>
            <section className="m-hp-section-getstarted">
                <div className="m-hp-btn-div">
                    <Button onClick={handleGetStarted} className="m-hp-btn" size="lg" color="primary" variant="contained">Get Started</Button>
                </div>
            </section>
                {/* <div className="m-hp-btn-div">
                    <Button onClick={async () => {
                        const hasValidSubscription = await SubChecker(loggedInUser)
                        console.log(hasValidSubscription)

                    }} className="m-hp-btn" size="lg" color="primary" variant="contained">SubChecker</Button>
                </div> */}
        </main>
    )
}