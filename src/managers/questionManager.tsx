//example link:
// https://localhost:5002/api/Question/uq/1

const _apiUrl = "/api/question"

export const getQuestionsGrouped = () => {
    return fetch(_apiUrl+"/grouped").then(
        (res) => res.json()
    )
}

export const getQuestionsGroupedandUser = (userid:number) => {
    return fetch(_apiUrl+"/uq/"+userid).then(
        (res) => res.json()
    )
}

export const createQuestion = (questionObj: any) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionObj)
    })
}

export const createQG = (qgObj: any) => {
    return fetch("/api/questiongroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qgObj)
    })
}