import { Button, Checkbox } from "@mui/material"
import { useEffect, useState } from "react"
import { Card, CardBody, CardFooter, CardGroup, CardTitle, Table } from "reactstrap"
import "./MobileMembershipPage.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom"
import { getMemberships } from "../../../managers/membershipManager";
import CloseIcon from '@mui/icons-material/Close';

export const MobileMembershipPage = ({ loggedInUser }: any) => {

    const [memberships, setMemberships] = useState<any>([])

    useEffect(() => {
        getMemberships().then(setMemberships)
    }, [])

    const navigate = useNavigate()

    const handleBuyBtn = () => {
        if (!loggedInUser) navigate("/login")
        else {
            window.location.href = 'https://buy.stripe.com/test_fZe5nx60afZB2FG4gg'
        }
    }

    return (
        <main>
            <section>
                <div className="mp-cardgroup-div">
                    <CardGroup>
                        {memberships.map((mrow: any) => {
                            return (
                                <Card className="mp-card" color="dark" inverse>

                                    <CardTitle className="mp-card-title" tag="h1">
                                        {mrow.name}
                                    </CardTitle>

                                    {mrow.price === 0 ?
                                        (
                                            <>
                                                <CardBody className="mp-card-body">
                                                    <div>
                                                        Access to User tab <Checkbox disableRipple color="success" checked={true} defaultChecked></Checkbox>
                                                    </div>
                                                    <div>
                                                        Access to All question tabs <Checkbox disableRipple color="error" checked={true} defaultChecked checkedIcon={<CloseIcon/>} ></Checkbox>
                                                    </div>
                                                </CardBody>

                                                <CardFooter className="mp-card-footer">
                                                    <>
                                                        <div className="mp-btn-div">
                                                            <Button size="large" endIcon={<LoginIcon />} className="mp-btn" onClick={() => navigate("/login")}>Register</Button>
                                                        </div>
                                                        <div className="mp-price">Free</div>
                                                    </>
                                                </CardFooter>
                                            </>
                                        )
                                            :
                                        (
                                                <>
                                                    <CardBody className="mp-card-body">
                                                        <div>
                                                            Access to User tab <Checkbox disableRipple color="success" checked={true} defaultChecked></Checkbox>
                                                        </div>
                                                        <div>
                                                            Access to All question Tabs <Checkbox disableRipple color="success" checked={true} defaultChecked></Checkbox>
                                                        </div>
                                                    </CardBody>

                                                    <CardFooter className="mp-card-footer">
                                                            <div className="mp-btn-div">
                                                                <Button onClick={handleBuyBtn} size="large" variant="contained" color="success" className="mp-btn" endIcon={<ShoppingCartIcon />}>Buy</Button>
                                                            </div>
                                                            {mrow.name === "Lifetime" ?
                                                                (<div className="mp-price">${mrow.price}</div>) :
                                                                (<div className="mp-price">${mrow.price}/{mrow.name.charAt(0).toLowerCase()}</div>)}
                                                    </CardFooter>
                                                </>
                                        )}
                                </Card>
                            )
                        })}
                    </CardGroup>
                </div>
            </section>
        </main>
    )
}