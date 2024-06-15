import { Card, CardBody, CardFooter, CardHeader } from "reactstrap"
import "./CreateQuestion.css"
import { Button, Checkbox, FormControl, InputLabel, Menu, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { createQuestion, getQuestionsGrouped } from "../../../managers/questionManager"
import { QuestionGroup } from "../../../types/QuestionTypes"

export const CreateQuestion = () => {

    const [questionGroups, setQuestionGroups] = useState<Array<QuestionGroup>>([])

    const [inputQG, setInputQG] = useState<number>(0)
    const [inputMembership, setInputMembership] = useState<boolean>(true);
    const [inputMultipleResponses, setInputMultipleResponses] = useState<boolean>(false);
    const [inputQuestion, setInputQuestion] = useState<string>("")
    
    const handleStateChange = (event:any, state:string) => {

        if(state === 'qg') setInputQG(event.target.value)
        else if(state === 'pu') setInputMembership(event.target.checked)
        else if(state === 'mr') setInputMultipleResponses(event.target.checked)
        else if(state === 'qp') setInputQuestion(event.target.value)
        else{
            console.log("an error has occured: Reloading Page...")
            window.location.reload()
        }

        // console.log(event)
        // console.log(event.target.value)
    }

    const handleSubmit = () => {

        const questionObjToPost = {
            body: inputQuestion,
            questionGroupId: inputQG,
            paidUsersOnly: inputMembership,
            multipleResponses: inputMultipleResponses
        }

        console.log(questionObjToPost)

        if(questionObjToPost.body === '' || questionObjToPost.questionGroupId === 0 || questionObjToPost.paidUsersOnly === null || questionObjToPost.multipleResponses === null){
            console.log('you are missing information. Please input a valid response for all feilds')
            window.alert("You are missing required fields.\nPlease input a valid response for all fields, and then submit\n\nIf you have, and this message still pops up, try reloading the page, or loging out and in of this account.")
        }
        else{
            createQuestion(questionObjToPost).then(() => {
                window.alert("Question Added! Reloading Page...")
                window.location.reload();
            })
        }
    }



    useEffect(() => {
        getQuestionsGrouped().then(setQuestionGroups)
    }, [])

    return (
        <main className="cq-main">
            <section className="cq-s1-form">
                <Card className="cq-card" color="dark" inverse>
                    <CardHeader className="cq-c-header">
                        Select a Question Group
                    </CardHeader>
                    <CardBody className="cq-c-body">
                        <div className="c-d-dropdown">
                            <FormControl fullWidth>
                                <InputLabel className="c-select-label">Tab</InputLabel>
                                <Select value={inputQG} className="c-select" variant="standard" onChange={(e) => handleStateChange(e, "qg")}>
                                    {questionGroups.map((qg) => {
                                        return (
                                            <MenuItem value={qg.id}>{qg.title}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </CardBody>
                </Card>
            </section>
            <section className="cq-sm-checkbox">
                <div className="cq-sm-d">
                    <FormControl className="d-fc2">
                        <div className="fc2-input-label">Membership Required? <Checkbox defaultChecked onChange={(e) => handleStateChange(e, "pu")} sx={{color: "gold", "&.Mui-checked": {color: "gold"}}} size="large" className="fc2-checkbox" /></div>
                    </FormControl>
                </div>
                <div className="cq-sm-d">
                    <FormControl className="d-fc2">
                        <div className="fc2-input-label">Multiple Responses? <Checkbox onChange={(e) => handleStateChange(e, "mr")} sx={{color: "hotpink", "&.Mui-checked": {color: "hotpink"}}} size="large" className="fc2-checkbox" /></div>
                    </FormControl>
                </div>
            </section>
            <section className="cq-s2-form">
                <Card className="cq-card2" color="dark" inverse>
                    <CardHeader className="cq-c2-header">
                        Question Prompt
                    </CardHeader>
                    <CardBody className="cq-c2-body">
                        <div className="c2-d-input">
                            <TextField onChange={(e) => handleStateChange(e, "qp")} className="c2-textfield" variant="standard" placeholder="ex: Number of Pets..." />
                        </div>
                    </CardBody>
                </Card>
            </section>
            <section>
                <div className="c2-d-btn">
                    <Button onClick={handleSubmit} color="success" className="c2-btn" variant="contained">
                        Submit
                    </Button>
                </div>
            </section>
        </main>
    )
}