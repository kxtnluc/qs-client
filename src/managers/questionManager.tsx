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