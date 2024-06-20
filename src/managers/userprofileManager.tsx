const _apiUrl = '/api/userprofile'

export const putIsPaidUser = (userid:number, isPaidUser:boolean) => {
    return fetch(_apiUrl+"/"+userid+"/"+isPaidUser, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    })
}