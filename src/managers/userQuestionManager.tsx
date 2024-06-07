import { UserQuestionDTO } from "../types/QuestionTypes"

const _apiUrl = "/api/userquestion"

export const getAllUserQuestions = () => {
    return fetch(_apiUrl).then(
        (res) => res.json()
    )
}

export const getUsersUserQuestions = (userid: number) => {
    return fetch(_apiUrl + "/" + userid).then(
        (res) => res.json()
    )
}

export const createUserQuestion = (userQuestionObj: UserQuestionDTO) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userQuestionObj)
    })
}

export const updateUserQuestion = (userQuestionId:number, response:string) => {
    return fetch(_apiUrl+"/"+userQuestionId+"?responseUpdate="+response, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    })
}

export const deleteUserQuestion = (userQuestionId:number) => {
    return fetch(_apiUrl+"/"+userQuestionId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}
    })
}