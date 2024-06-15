import { useEffect, useState } from "react"
import { QuestionGroup } from "../../../types/QuestionTypes"
import { createQG, getQuestionsGrouped } from "../../../managers/questionManager"
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap"
import "./CreateQG.css"
import { Button, TextField } from "@mui/material"

export const CreateQG = () => {

    const [questionGroups, setQuestionGroups] = useState<Array<QuestionGroup>>([])

    const [inputTitle, setInputTitle] = useState<string>("")

    useEffect(() => {
        getQuestionsGrouped().then(setQuestionGroups)
    },[])

    const handleTitleChange = (e:any) => {
        if(e.target.value !== '') setInputTitle(e.target.value)
    }

    const handleSubmit = () => {

        const qgObj = {
            title: inputTitle
        }

        if(qgObj.title !== ''){
            createQG(qgObj).then(() => {
                window.alert("Tab added!\nHead to the 'myhome' page to check it out!\n\n Page Reloading...")
                window.location.reload();
            })
        }
    }

    return (
        <main className="cqg-main">
            <section className="cqg-s-header">
                <Card className="cqg-card" color="dark" inverse>
                    <CardHeader className="cqg-c-header">
                        Current Question Groups
                    </CardHeader>
                    <CardFooter className="cqg-c-footer">
                        {questionGroups.map((qg) => {
                            return (
                                <span className="cqg-c-span">
                                   {qg.title}
                                </span>
                            )
                        })}
                    </CardFooter>
                </Card>
            </section>
            <section className="cqg-s-form">
                <Card className="cqg-card2" color="dark" inverse>
                    <CardHeader className="cqg-c2-header">
                        Create New Question Group
                    </CardHeader>
                    <CardBody className="cqg-c2-body">
                        <div className="c2-d-input">
                            <TextField onChange={(e) => handleTitleChange(e)} className="c2-textfield" variant="standard" placeholder="Name..."/>
                        </div>
                        <div className="c2-d-btn">
                            <Button onClick={handleSubmit} className="c2-btn" variant="contained">
                                Add
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </section>
        </main>
    )
}