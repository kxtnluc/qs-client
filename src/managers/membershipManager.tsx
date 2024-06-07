const _apiUrl = "/api/membership"

export const getMemberships = () => {
    return fetch(_apiUrl).then(
        (res) => res.json()
    )
}