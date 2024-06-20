import { Card, CardBody, CardHeader, CardImg } from "reactstrap"
import "./AdminPortal.css"
import { useNavigate } from "react-router-dom";

export const AdminPortal = () => {

    const navigate = useNavigate();

    const handleRedirect = (selectid:number) => {
        if(selectid === 1) navigate("create/questiongroup")
        if(selectid === 2) navigate("create/question")
    }

    return (
        <main className="ap-main">
            <section className="ap-section">
                <Card color="dark" inverse className="ap-card" onClick={() => handleRedirect(1)}>
                    <CardHeader className="ap-header">Create Question Group</CardHeader>
                    <CardBody className="ap-body">Create a new empty Tab to fill with questions</CardBody>
                </Card>
            </section>

            <section className="ap-section">
                <Card color="dark" inverse className="ap-card" onClick={() => handleRedirect(2)}>
                    <CardHeader className="ap-header">Create a Question</CardHeader>
                    <CardBody className="ap-body">Create a new question and attach it to a Question Group</CardBody>
                </Card>
            </section>
        </main>

    )
}